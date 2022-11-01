import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { useTourskyStore } from '../../src/zustand'
import { Axios } from '../api'
import Link from 'next/link'

const Login = () => {

    const router = useRouter()
    const { register, handleSubmit } = useForm()

    const submitHandler = async (values:any) => {
        try {
            const body = {
                email: values.email,
                password: values.password,
            }
            await Axios.post('/api/v1/users/login',body)
            useTourskyStore.getState().setAuthenticator(true)
            useTourskyStore.getState().setAlertPopup({ status: true, type: "success", message: "Logged in successfuly!" })
            router.push('/')
        } catch (error) {
            console.log(error)
            // useTourskyStore.getState().setAlertPopup({ status: true, type: "error", message: error.response.data.message })
        }
    }

    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
                <form onSubmit={handleSubmit(submitHandler)} className="form">
                    <div className="form__group">
                        <label htmlFor="email" className="form__label">Email address</label>
                        <input type="email" {...register("email")} className="form__input" placeholder="you@example.com" required />
                    </div>
                    <div className="form__group ma-bt-md">
                        <label htmlFor="password" className="form__label">Password</label>
                        <input type="password" {...register("password")} className="form__input" placeholder="••••••••" required minLength={8} />
                    </div>
                    <div className="form__group flex items-center justify-between">
                        <button type='submit' className="btn btn--green">Login</button>
                        <Link href="/auth/forgotPassword">
                            <div className="form__group--password">Forgotten password?</div>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login