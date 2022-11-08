import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Card from './components/Card'
import { useTourskyStore } from '../src/zustand'
import { Axios } from './api'
import { Tour } from '../typings'

interface Tours {
  tours: [Tour]
}  

const Home = ({tours}:Tours) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/')
  },[])

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
  req: {
    cookies: { jwt: string }
  }
  query: {
    session_id: string,
    client_id: string,
  }
}

export const getServerSideProps = async ({req,query}:Params) => {
  
  const res1 = await Axios.get('/api/v1/tours')
  useTourskyStore.getState().setTours(res1.data.tours)

  // console.log(req.cookies)
  // console.log(query)
  
  if(!!query.session_id) {
    const headers = {"Authorization" : `Bearer ${req.cookies.jwt}`}
    const res2 = await Axios.get(`/api/v1/bookings/checkout-session-status/${query.session_id}`, { headers })
    if(res2.data.session.status === "complete"){
      console.log('✅ payment ', res2.data.session.status)
      const body = {
        tour: res2.data.session.client_reference_id,
        user: query.client_id,
        price: res2.data.session.amount_total / 100,
      }
      await Axios.post(`/api/v1/bookings`, body, { headers })
    }
  }

  return {
    props: { tours: res1.data.tours }
  }
}