
import axios from "axios";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API = import.meta.env.VITE_API



const useUserStore = create(persist((set,get)=>({
    user : null ,
    token : '',
    filter : {
        journeyDate: new Date(),
        returnDate: new Date(),
        guest: 1
    },
    selectedLocation: null,
    setSelectedLocation:(location)=>set({selectedLocation : location}),
    setFilter : (value)=>{
        set({filter : value})
    },
    login : async(body)=>{
        const result = await axios.post(`${API}/auth/login`,body)
        set({token : result.data.token , user : result.data.user})
    },
    logout : ()=>{
        set({token : '',user : null})
    },
    register : async (body)=>{
        console.log(body)
        await axios.post(`${API}/auth/register`,body)
    },
    googleLogin : async(accessToken)=>{
        const result = await axios.post(`${API}/auth/google`, { accessToken });
        set({token : result.data.token , user : result.data.user})
    }
}),{

    name : "stateUserData",
    storage : createJSONStorage(()=>localStorage),
    partialize: (state) => ({ 
        user : state.user,
        token: state.token 
    })
}))



export default useUserStore