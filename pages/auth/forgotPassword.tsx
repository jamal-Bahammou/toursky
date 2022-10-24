import React from 'react'
import { useForm } from "react-hook-form"
import { useTourskyStore } from '../../src/zustand'
import { Axios } from '../api'

const ForgotPassword = () => {

    const { register, handleSubmit } = useForm()

    const submitHandler = async (values:any) => {
        try {
            const body = {
                email: values.email
            }
            await Axios.post('/api/v1/users/forgotPassword',body)
            useTourskyStore.getState().setAlertPopup({ status: true, type: "success", message: "Email sended successfuly!" })
        } catch (error) {
            useTourskyStore.getState().setAlertPopup({ status: true, type: "error", message: error.response.data.message })
        }
    }

    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Find Your Account</h2>
                <form onSubmit={handleSubmit(submitHandler)} className="form">
                    <div className="form__group">
                        <label htmlFor="email" className="form__label">Email address</label>
                        <input type="email" {...register("email")} className="form__input" placeholder="you@example.com" required />
                    </div>
                    <div className="form__group">
                        <button type='submit' className="btn btn--green">Send</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ForgotPassword