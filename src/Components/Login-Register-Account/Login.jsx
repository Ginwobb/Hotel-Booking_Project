import React, { useEffect, useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-USER.png";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleloginbutton from "../../assets/googleloginbuttonanimation3.gif";

const Login = ({ setIsLoginModalOpen }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    err: "",
  });
  const { token, login, loginWithGoogle } = useUserStore(
    useShallow((state) => ({
      token: state.token,
      login: state.login,
      loginWithGoogle: state.googleLogin,
    }))
  );

  useEffect(() => {
    if (token) {
      setIsLoginModalOpen(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: input.email, password: input.password });
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      setInput((prev) => ({ ...prev, err: errMsg }));
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      if (accessToken) {
        try {
          await loginWithGoogle(accessToken);
          setIsLoginModalOpen(false);
        } catch (error) {
          console.error("Google login error:", error);
        }
      } else {
        console.error("No access token found in response.");
      }
    },
    onError: () => console.log("Google login failed"),
  });

  return (
    <div
      onClick={() => setIsLoginModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-[#543310]"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF8EB] rounded-lg shadow-lg p-8  w-full max-w-2xl relative flex"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none transition duration-200"
        >
          ✕
        </button>

        <div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2">
          <img
            src={travellogo}
            alt="Travel Logo"
            className="w-[100px] h-[100px] rounded-lg shadow-lg bg-[#FFF8EB]"
          />
        </div>

        <div className="w-1/2 pr-4 mt-6">
          <img
            src="/1.jpg"
            alt="Hotel Preview"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="w-1/2 pl-4 space-y-4">
          <div className="mt-8 space-y-4">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              onChange={handleChange}
            />
            <label className="block mt-4">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-[#FFE4B0] w-full p-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              onChange={handleChange}
            />
          </div>

          <div className="text-right text-xs pb-2 text-gray-400 cursor-pointer hover:underline mb-4">
            Forget Password
          </div>

          <button
            onClick={() => googleLogin()}
            type="button"
            className="flex items-center justify-center w-full"
            style={{
              outline: "none",
              border: "2px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "transparent",
              padding: "4px",
              margin: 0,
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0px 2px 4px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={googleloginbutton}
              alt="Google Login"
              className="w-[150px] h-[40px] rounded-lg"
              style={{
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>

        <div className="absolute bottom-[-29px] left-1/2 transform -translate-x-1/2">
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

// import React, { useEffect, useState } from "react";
// import travellogo from "../../assets/TRAVELHOMELOGO-USER.png";
// import useUserStore from "../../stores/user-store";
// import { useShallow } from "zustand/shallow";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// const Login = ({ setIsLoginModalOpen }) => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     err: "",
//   });
//   const { token, login } = useUserStore(
//     useShallow((state) => ({
//       token: state.token,
//       login: state.login,
//     }))
//   );

//   useEffect(() => {
//     if (token) {
//       setIsLoginModalOpen(false);
//     }
//   }, [token]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login({ email: input.email, password: input.password });
//     // console.log("Form submitted");
//   };

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleGoogleLogin = async (credential) => {
//     await axios.post("http://localhost:8000/auth/google", { credential });
//     // navigate
//   };

//   return (
//     <div
//       onClick={() => setIsLoginModalOpen(false)}
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//     >
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#FFF8EB] rounded-lg shadow-lg p-8 w-full max-w-2xl relative flex"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           type="button"
//           onClick={() => setIsLoginModalOpen(false)}
//           className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none transition duration-200"
//         >
//           ✕
//         </button>

//         <div className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2">
//           <img
//             src={travellogo}
//             alt="Travel Logo"
//             className="w-[100px] h-[100px] rounded-lg shadow-lg bg-[#FFF8EB]"
//           />
//         </div>

//         <div className="w-1/2 pr-4 mt-6">
//           <img
//             src="/1.jpg"
//             alt="Hotel Preview"
//             className="w-full h-full rounded-lg object-cover"
//           />
//         </div>

//         <div className="w-1/2 pl-4 space-y-4">
//           <div className="mt-8 space-y-4">
//             <label>Email</label>
//             <input
//               name="email"
//               type="email"
//               placeholder="Email"
//               className="bg-[#FFE4B0] w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               required
//               onChange={handleChange}
//             />
//             <label className="block mt-4">Password</label>
//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               className="bg-[#FFE4B0] w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               required
//               onChange={handleChange}
//             />
//           </div>
//           <div className="text-right text-xs text-gray-500 cursor-pointer hover:underline">
//             Forget Password
//           </div>
//           {/* <button
//             type="button"
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center p-3  border-2 border-black rounded-lg  shadow-md hover:bg-gray-100 transition bg-[#FFF8EB]"
//           >
//             <span className="mr-2">🌐</span>
//             <span className="font-medium">Continue with Google</span>
//           </button> */}
//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               const { credential } = credentialResponse;
//               handleGoogleLogin(credential);
//             }}
//             onError={() => {
//               console.log("Login Failed");
//             }}
//           />
//         </div>

//         <div className="absolute bottom-[-29px] left-1/2 transform -translate-x-1/2">
//           <button
//             type="submit"
//             className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition"
//           >
//             LOGIN
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
