import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useTourskyStore } from '../../src/zustand'
import { Axios } from '../api'
 
const Settings = () => {

    const { user } = useTourskyStore()
    const { register, handleSubmit, reset, resetField, watch, getFieldState } = useForm()
    const [image,setImage] = useState(null)

    useEffect(() => {
        reset({name:user.name,email:user.email,photo:[new Blob()]})
    }, [user])

    useEffect(() => {
        setImage(URL.createObjectURL(watch('photo')[0]))
    }, [watch('photo')])

    const resetOverviewImage = () => {
        resetField('photo')
        setImage(null)
    }

    const userSubmitHandler = async (values:any) => {
        try {
            const formData = new FormData()
            formData.append('name',values.name)
            formData.append('email',values.email)
            if(getFieldState("photo").isTouched) formData.append('photo',values.photo[0])

            const headers = {'Content-Type': 'multipart/form-data'}
            const res = await Axios.patch('/api/v1/users/updateMe',formData, {headers})

            useTourskyStore.getState().setUser(res.data.user)
            useTourskyStore.getState().setAlertPopup({ status: true, type: "success", message: "ACCOUNT updated successfully!" })
        } catch (error) {
            console.log(error)
            // useTourskyStore.getState().setAlertPopup({ status: true, type: "error", message: error.response.data.message })
        }
    }

    const resetSubmitHandler = async (values:any) => {
        try {
            const body = {
                passwordCurrent: values.passwordCurrent,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
            }
            await Axios.patch('/api/v1/users/updateMyPassword',body)
            reset()
            useTourskyStore.getState().setAlertPopup({ status: true, type: "success", message: "PASSWORD updated successfully!" })
        } catch (error) {
            console.log(error)
            // useTourskyStore.getState().setAlertPopup({ status: true, type: "error", message: error.response.data.message })
        }
    }

    return (
        <div className="user-view__content">

            <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
                <form onSubmit={handleSubmit(userSubmitHandler)} className="form form-user-data">
                    <div className="form__group">
                        <label className="form__label" htmlFor="name">Name</label>
                        <input type="text" {...register("name")} className="form__input" required name="name" />
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="email">Email address</label>
                        <input type="email" {...register("email")} className="form__input" required name="email" />
                    </div>
                    <div className="form__group form__photo-upload">
                        <img className="form__user-photo" src={getFieldState("photo").isTouched ? image : `http://127.0.0.1:3030/img/users/${user?.photo}`} alt="User photo" />
                        <input id="photoFor" type="file" {...register("photo")} className="form__upload" accept="image/*" name="photo" />
                        <label htmlFor="photoFor">Choose new photo</label>
                        <svg onClick={() => resetOverviewImage()} className='form__label-icon'>
                            <use xlinkHref="/img/icons.svg#icon-delete"></use>
                        </svg>
                    </div>
                    <div className="form__group right">
                        <button type='submit' className="btn btn--small btn--green">Save settings</button>
                    </div>
                </form>
            </div>

            <div className="line">&nbsp;</div>

            <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form onSubmit={handleSubmit(resetSubmitHandler)} className="form form-user-password">
                    <div className="form__group">
                        <label className="form__label" htmlFor="password-current">Current password</label>
                        <input type="password" {...register("passwordCurrent")} className="form__input" placeholder="••••••••" required minLength={8} />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="password">New password</label>
                        <input type="password" {...register("password")} className="form__input" placeholder="••••••••" required minLength={8} />
                    </div>
                    <div className="form__group ma-bt-lg">
                        <label className="form__label" htmlFor="password-confirm">Confirm password</label>
                        <input type="password" {...register("passwordConfirm")} className="form__input" placeholder="••••••••" required minLength={8} />
                    </div>
                    <div className="form__group right">
                        <button type='submit' className="btn btn--small btn--green btn--save-password">Save password</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Settings