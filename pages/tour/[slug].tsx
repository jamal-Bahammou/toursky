import React from 'react'
import Mapbox from '../components/Mapbox'
import { Axios } from '../api'
import { Review, Tour } from '../../typings'
import { useTourskyStore } from '../../src/zustand'
import Link from 'next/link'

interface Props {
    tour: Tour,
    reviews: Review[]
}

const TourView = ({tour,reviews}:Props) => {

    const { authenticator, stripe } = useTourskyStore()
    
    const paymentHandler = async () => {
        const res = await Axios.get(`/api/v1/bookings/checkout-session/${tour.id}`)
        await stripe.redirectToCheckout({sessionId:res.data.session.id})
    }
    
    return (
            <>
                <section className="section-header">
                    <div className="header__hero">
                        <div className="header__hero-overlay">&nbsp;</div>
                        <img className="header__hero-img" src={`https://toursky.herokuapp.com/img/tours/${tour.imageCover}`} alt={tour.name} />
                    </div>
                    <div className="heading-box">
                        <h1 className="heading-primary">
                        <span>{tour.name} Tour</span>
                        </h1>
                        <div className="heading-box__group">
                        <div className="heading-box__detail">
                            <svg className="heading-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-clock"></use>
                            </svg>
                            <span className="heading-box__text">{tour.duration} days</span>
                        </div>
                        <div className="heading-box__detail">
                            <svg className="heading-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                            </svg>
                            <span className="heading-box__text">{tour?.startLocation?.description}</span>
                        </div>
                        </div>
                    </div>
                </section>

                <section className="section-description">
                <div className="overview-box">
                    <div>
                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                        <div className="overview-box__detail">
                            <svg className="overview-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                            </svg>
                            <span className="overview-box__label">Next date</span>
                            <span className="overview-box__text">{new Date(tour.startDates[0]).toLocaleString('en-us', {month:'long',year:'numeric'})}</span>
                        </div>
                        <div className="overview-box__detail">
                            <svg className="overview-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                            </svg>
                            <span className="overview-box__label">Difficulty</span>
                            <span className="overview-box__text">{tour.difficulty}</span>
                        </div>
                        <div className="overview-box__detail">
                            <svg className="overview-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-user"></use>
                            </svg>
                            <span className="overview-box__label">Participants</span>
                            <span className="overview-box__text">{tour.maxGroupSize} people</span>
                        </div>
                        <div className="overview-box__detail">
                            <svg className="overview-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-star"></use>
                            </svg>
                            <span className="overview-box__label">Rating</span>
                            <span className="overview-box__text">{tour.ratingsAverage} / 5</span>
                        </div>
                    </div>

                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                        {tour.guides.map(guide => (
                            <div key={guide._id} className="overview-box__detail">
                                <img src={`https://toursky.herokuapp.com/img/users/${guide.photo}`} alt="Lead guide" className="overview-box__img"/>
                                <span className="overview-box__label">{guide.role === "guide" ? 'Tour ' : ''}{guide.role.replace('-', ' ')}</span>
                                <span className="overview-box__text">{guide.name}</span>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="description-box">
                    <h2 className="heading-secondary ma-bt-lg">About the park camper tour</h2>
                    {tour?.description?.split('\n').map((paragraph,index) => <p key={index} className="description__text">{paragraph}</p>)}
                </div>
                </section>

                <section className="section-pictures">
                    {tour.images.map((image,index) => (
                        <div key={index} className="picture-box">
                            <img className={`picture-box__img picture-box__img--${index+1}`} src={`https://toursky.herokuapp.com/img/tours/${image}`} alt="The Park Camper Tour 1"/>
                        </div>
                    ))}
                </section>

                <Mapbox locations={tour.locations} />

                <section className="section-reviews">
                    {reviews.length > 0 &&
                        <div id="style-1" className="reviews">
                            {reviews.map((review:Review,index) => (
                                    <div key={index} className="reviews__card">
                                        <div className="reviews__avatar">
                                            <img src={`https://toursky.herokuapp.com/img/users/${review.user.photo}`} alt="Jim Brown" className="reviews__avatar-img"/>
                                            <h6 className="reviews__user">{review.user.name}</h6>
                                        </div>
                                        <p className="reviews__text">{review.review}</p>
                                        <div className="reviews__rating">
                                            {[1,2,3,4,5].map(star => (
                                                <svg key={star} className={`reviews__star reviews__star--${review.rating >= star ? `active` : `inactive`}`}>
                                                    <use xlinkHref="/img/icons.svg#icon-star"></use>
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    }
                </section>

                <section className="section-cta">
                    <div className="cta">
                        <div className="cta__img cta__img--logo">
                        <img src="/img/logo-white.png" alt="Natours logo" className="" />
                        </div>
                        <img src={`https://toursky.herokuapp.com/img/tours/${tour.images[0]}`} alt="" className="cta__img cta__img--1" />
                        <img src={`https://toursky.herokuapp.com/img/tours/${tour.images[1]}`} alt="" className="cta__img cta__img--2" />

                        <div className="cta__content">
                        <h2 className="heading-secondary">What are you waiting for?</h2>
                        <p className="cta__text">
                            {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
                        </p>
                        {authenticator
                            ? <button onClick={() => paymentHandler()} className="btn btn--green span-all-rows">Book tour now!</button>
                            : <Link href='/auth/login'><button className="btn btn--green span-all-rows">Log in to book tour</button></Link>
                        }
                        </div>
                    </div>
                </section>
            </>
    )
}

export default TourView


// 💯 STATIC SITE GENERATION --------------------------------------------------------------------------------------------------------------

interface Params {
    params: {
        slug: string
    }
}

export const getStaticPaths = async () => {
    const res = await Axios.get('/api/v1/tours')
  
    const paths = res.data.tours.map(({slug}:Tour) => ({
        params: { slug }
    }))

    return {
      paths,
      fallback: false
    }
}

export const getStaticProps = async ({params}:Params) => {

    const _params = {slug: params?.slug}
    const res1 = await Axios.get(`/api/v1/tours`,{params:_params})

    const res2 = await Axios.get(`/api/v1/tours/${res1.data.tours[0]?._id}/reviews`)
    
    return {
        props: {
            tour: res1.data.tours[0],
            reviews: res2.data.reviews,
        },
        revalidate: 60,
    }
}