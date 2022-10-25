import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { useTourskyStore } from '../../src/zustand'
import { Axios } from '../api'

const Signup = () => {

    const router = useRouter()
    const { register, handleSubmit } = useForm()

    const submitHandler = async (values:any) => {
        try {
            const body = {
                name: values.name,
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
                credentials: 'include',
                mode: 'cors'
            }
            await Axios.post('/api/v1/users/signup',body)
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
                <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
                <form onSubmit={handleSubmit(submitHandler)} className="form form--signup">
                    <div className="form__group">
                        <label className="form__label" htmlFor="name">Your name</label>
                        <input className="form__input" {...register("name")} type="text" placeholder="" required />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">Email address</label>
                        <input className="form__input" {...register("email")} type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="password">Password</label>
                        <input className="form__input" {...register("password")} type="password" placeholder="••••••••" required minLength={8} />
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="passwordConfirm">Confirm password</label>
                        <input className="form__input" {...register("passwordConfirm")} type="password" placeholder="••••••••" required minLength={8} />
                    </div>
                    <div className="form__group">
                        <button className="btn btn--green">Sign up</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Signup