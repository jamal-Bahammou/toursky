import React, { useEffect } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"
import { Axios } from '../api'
import { useTourskyStore } from '../../src/zustand'

const Header = () => {

  const router = useRouter()
  const { authenticator, user } = useTourskyStore()

  useEffect(() => {
    async function getMe() {
      try {
        const res = await Axios.get('/api/v1/users/me')
        useTourskyStore.getState().setUser(res.data.user)
        useTourskyStore.getState().setAuthenticator(true)
      } catch (error) {
        console.log("👤 There is no logged in user!")
      }
    }
    getMe()
  }, [authenticator])

  const logout = async () => {
    try {
      const res = await Axios.get('/api/v1/users/logout')
      if(res.data.status === 'success') {
        router
          .push('/')
          .finally(() => router.reload())
      }
      useTourskyStore.getState().setAuthenticator(false)
    } catch (error) {
      useTourskyStore.getState().setAlertPopup({ status: true, type: "error", message: "Error logging out! Try again." })
    }
  }

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link href="/">
          <a href="/" className="nav__el">All tours</a>
        </Link>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>

      {!!user?._id ? (
      <nav className="nav nav--user">
        <div onClick={() => logout()} className="nav__el">Log out</div>
        <Link href="/me/settings">
          <div className="nav__el">
            <img src={`https://toursky.herokuapp.com/img/users/${user?.photo}`} alt="User photo" className="nav__user-img" />
            <span>{user?.name.split(' ')[0]}</span>
          </div>
        </Link>
      </nav>
      ) : (
      <nav className="nav nav--user">
        <Link href="/auth/login">
          <button className="nav__el">Log in</button>
        </Link>
        <Link href="/auth/signup">
          <button className="nav__el nav__el--cta">Sign up</button>
        </Link>
      </nav>
      )}
    </header>
  )
}

export default Header