import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { useTourskyStore } from '../../src/zustand'
import { Axios } from '../api'

const ResetPassword = () => {

    const router = useRouter()
    const { register, handleSubmit } = useForm()

    const { resetToken } = router.query

    const submitHandler = async (values:any) => {
        try {
            const body = {
                password: values.password,
                passwordConfirm: values.passwordConfirm,
                credentials: 'include',
                mode: 'cors'
            }
            await Axios.patch(`/api/v1/users/resetPassword/${resetToken}`,body)
            useTourskyStore.getState().setAuthenticator(true)
            useTourskyStore.getState().setAlertPopup({ status: true, type: "success", message: "Logged in successfuly!" })
            router.push('/')
        } catch (error) {
            useTourskyStore.getState().setAlertPopup({ status: true, type: "error", message: error.response.data.message })
        }
    }

    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Reset your password!</h2>
                <form onSubmit={handleSubmit(submitHandler)} className="form form--signup">
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

export default ResetPassword