import React, { useEffect, useState } from 'react'
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide'
import Footer from '../../Components/Nav-Footer-Chat/Footer'
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from 'axios'
import useUserStore from '../../stores/user-store';
const API = import.meta.env.VITE_API


function UUIDBookingSearch() {
    const [pageParam, setPageParam] = useState({
        errMsg: '',
        isLoading: false
    })
    const searchBooking = useUserStore(state=>state.searchBooking)
    const [booking, setBooking] = useState(null)
    useEffect(()=>{
        hdlSearch()
    },[searchBooking])

    const hdlSearch = async () => {
        try {
            const result = await axios.get(`${API}/booking/${searchBooking}`)
            console.log(result.data)
            setBooking(result.data)
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            setPageParam(prv => ({ ...prv, errMsg }))
        }
    }
    return (
        <div>

                <HeaderUserPage />
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5 pb-40">

                    {
                        booking &&
                        <div className='flex w-fit bg-luxury-cream-gradient rounded-md mx-auto shadow-lg mt-40'>
                            <div className='flex flex-col w-full p-8'>
                                <div className='flex'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex w-full justify-between gap-2 items-baseline'>
                                            <h1 className='text-4xl font-bold p-2'>Booking</h1><p className='text-gray-500'>{booking.UUID} </p>
                                        </div>
                                        <h2 className='flex bg-blue-100 justify-center p-2 text-2xl font-bold text-white bg-orange-dark-pink-gradient w-full rounded-md'>Hotel Info</h2>
                                        <div className='flex gap-4 bg-white p-4 rounded-md'>
                                            <div className='p-1 border-2 w-fit border-pink-500 rounded-lg'>
                                                <img src={booking.hotels.img} alt={booking.hotels.name} className='w-[400px] max-h-[320px] object-cover rounded-lg' />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-1 px-2'>
                                                    <h3 className='text-2xl font-semibold'>{booking.hotels.name}</h3>
                                                    <p className='text-lg'>{booking.hotels.detail}</p>
                                                    <div className='flex gap-2 mt-8'>
                                                        <h4 className='text-lg underline'>Address</h4><p className='text-lg'>{booking.hotels.address}</p>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <h4 className='text-lg underline'>Web Page</h4><p className='text-lg'>{booking.hotels.webPage}</p>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <h4 className='text-lg underline'>Tel.</h4><p className='text-lg'>{booking.hotels.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h2 className='flex justify-center p-2 text-2xl font-bold text-white bg-orange-dark-gradient w-full rounded-md'>Room Info</h2>
                                            <div className='flex-row-reverse flex justify-center gap-4 w-full  bg-white p-4 rounded-md'>

                                                <div className='p-1 border-2 w-fit border-amber-600 rounded-lg'>
                                                    <img src={booking.bookingRooms[0].rooms.images[0].img} alt={booking.bookingRooms[0].rooms.name} className='w-[400px] max-h-[320px] object-cover rounded-lg' />
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-1 pt-4'>
                                                        <h3 className='text-2xl font-semibold'>{booking.bookingRooms[0].rooms.name}</h3>
                                                        <p className='text-lg text-end'>{booking.bookingRooms[0].rooms.detail}</p>
                                                        <div className='flex gap-2 mt-8'>
                                                            <p className='text-lg underline'>Price</p><p className='text-lg'>{booking.bookingRooms[0].rooms.price} THB/Day</p>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <p className='text-lg underline'>Type</p><p className='text-lg'>{booking.bookingRooms[0].rooms.type}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='flex flex-col w-full gap-2'>
                                            <h2 className='flex justify-center p-2 text-2xl font-bold text-white bg-orange-dark-pink-gradient w-full rounded-md'>Booking Info</h2>
                                            <div className='flex justify-center items-start'>
                                                <div className='flex items-start w-full h-fit justify-center gap-10 p-3'>
                                                    <div className='flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg'>
                                                        <h1 className='text-center text-2xl font-bold'>Detail</h1>
                                                        <hr className='border-gray-300' />
                                                        <div className='flex gap-1 text-lg'>
                                                            <h2 className='font-semibold'>Booking Date :</h2>
                                                            <h2>{booking.createdAt.split('', 10)}</h2>
                                                        </div>
                                                        <div className='flex justify-center items-center'>
                                                            <div className='flex bg-white border border-gray-400 py-4 px-8 rounded-lg'>
                                                                <div className='flex flex-col gap-1 text-center'>
                                                                    <p className='font-semibold'>Check-in Date</p>
                                                                    <p className='text-sm'>{booking.checkinDate.split('', 10)}</p>
                                                                </div>
                                                            </div>
                                                            <HiOutlineArrowNarrowRight size={50} color='orange' />
                                                            <div className='flex bg-white border border-gray-400 py-4 px-8 rounded-lg'>
                                                                <div className='flex flex-col gap-1 text-center'>
                                                                    <p className='font-semibold'>Check-out Date</p>
                                                                    <p className='text-sm'>{booking.checkoutDate.split('', 10)}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='flex flex-col gap-1'>

                                                            <div className='flex justify-between'>
                                                                <h1 className='text-xl font-semibold'>Status</h1>
                                                                <p className={`font-bold text-xl ${booking.status === 'CONFIRMED' ? 'text-green-500' : 'text-amber-500'}`}>{booking.status}</p>
                                                            </div>
                                                            <hr className='border-gray-300'></hr>
                                                            <div className='flex justify-between'>
                                                                <h1 className='text-2xl font-semibold'>Total</h1>
                                                                <p className='text-orange-500 font-bold text-2xl'>{booking.totalPrice} THB</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex pb-32 flex-col gap-4 bg-white p-4 rounded-lg shadow-lg'>
                                                        <h1 className='text-center text-2xl font-bold'>Contact</h1>
                                                        <hr className='border-gray-300' />
                                                        <div className='flex flex-col gap-2'>

                                                            <div className='flex justify-between items-baseline w-[320px]'>
                                                                <h2 className='text-xl font-semibold'>Name :</h2>
                                                                <h2>{booking.firstName + ' ' + booking.lastName}</h2>
                                                            </div>
                                                            <div className='flex justify-between items-baseline'>
                                                                <h2 className='text-xl font-semibold'>Email :</h2>
                                                                <h2>{booking.email}</h2>
                                                            </div>
                                                            <div className='flex justify-between items-baseline'>
                                                                <h2 className='text-xl font-semibold'>Phone :</h2>
                                                                <h2>{booking.phone}</h2>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <PictureSlide />
            <Footer />
        </div>
    )
}

export default UUIDBookingSearch