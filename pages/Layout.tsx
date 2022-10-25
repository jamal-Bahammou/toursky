import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { useTourskyStore } from '../src/zustand'

const Layout = ({children}: any) => {

  const { alertPopup: { status, type, message } } = useTourskyStore()

  useEffect(() => {
    if(status)
      setTimeout(() => {useTourskyStore.getState().setAlertPopup({status: false, type: "success", message: ""})}, 3000)
    }, [status])

  useEffect(() => {
      const stripe = Stripe('pk_test_51LuwwtHdYhmEqyjwyKoMflY3hudBSQkddOp7M2cuM5CBfbMD4dnOK0n5vlf8aQgDKZnbaDQjCLvrt7NItZi0AVYF00MoyJ8soO');
      useTourskyStore.getState().setStripe(stripe)
    }, [])


    console.log('This is it')


  return (
    <>
        <Head>
          <title>Toursky | All Tours</title>
          <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,500,700" />
        </Head>
        <Header />
        {status && <div className={`alert alert--${type}`}>{message}</div>}
        {children}
        <Footer />
        <script src="https://js.stripe.com/v3/"></script>
    </>
  )
}

export default Layout