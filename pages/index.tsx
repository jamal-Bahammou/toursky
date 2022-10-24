import React, { useEffect } from 'react'
import Card from './components/Card'
import { useTourskyStore } from '../src/zustand'
import { Axios } from './api'
import { Tour } from '../typings'

interface Tours {
  tours: [Tour],
  session_id: string
}  

const Home = ({tours,session_id}:Tours) => {

  const { user } = useTourskyStore()

  useEffect(() => {
    try {
      if(!!session_id) {
        const getCheckoutSessionStatus = async () => {
          const res1 = await Axios.get(`/api/v1/bookings/checkout-session-status/${session_id}`)
          console.log('✅ payment ', res1.data.session.status)

          if(res1.data.session.status === "complete"){
            const body = {
              tour: res1.data.session.client_reference_id,
              user: user._id,
              price: res1.data.session.amount_total / 100,
            }
            console.log(user)
            await Axios.post(`/api/v1/bookings`, body)
          }

        }
        getCheckoutSessionStatus()
      }
    } catch (error) {
      console.log(error)
    }
  }, [session_id])

  return (
    <main className="main">
      <section className="overview">
        <div className="card-container">
          {tours.map(tour => <Card key={tour._id} {...tour} />)}
        </div>
      </section>
    </main>
  )
}

export default Home

interface Params {
  query: {
    session_id: string
  }
}

export const getServerSideProps = async ({query}:Params) => {

  const res = await Axios.get('/api/v1/tours')
  useTourskyStore.getState().setTours(res.data.tours)

  return {
    props: { tours: res.data.tours, session_id: !!query.session_id? query.session_id : "" }
  }
}