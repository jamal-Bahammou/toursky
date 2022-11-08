import React, { useEffect, useState } from 'react'
import { useTourskyStore } from '../../src/zustand'
import { Axios } from '../api'
import Card from './Card'
import MiniCard from './MiniCard'

const Bookings = () => {

    const { user } = useTourskyStore()
    const [bookings,setBookings] = useState([])

    useEffect(() => {
        (async () => {
            if(!!user._id){
                const res = await Axios.get(`/api/v1/bookings?user=${user._id}`)
                setBookings(res.data.bookings)
            }
        })()
    },[user])

    return (
        <div className="user-view__content">
            <div className="mx-10">
                <h2 className="heading-secondary mb-[30px]">My bookings</h2>
                <div className="grid grid-cols-3 gap-10">
                    {bookings.map(({tour}) => <MiniCard key={tour._id} {...tour} />)}
                </div>
            </div>
        </div>
    );
}

export default Bookings