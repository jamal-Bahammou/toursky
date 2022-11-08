import React from 'react'
import Link from "next/link"
import { Tour } from '../../typings'

const MiniCard = (tour:Tour) => {
  return (
    <div className="card">

      <div className="card__header">
        <div className="card__picture-mini">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={`https://toursky.herokuapp.com/img/tours/${tour.imageCover}`}
            alt={tour.name}
            className="card__picture-img"
          />
        </div>

        <h3 className="heading-tertirary-mini">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="card__details-mini">
        <h4 className="card__sub-heading">{tour.difficulty} {tour.duration}-day tour</h4>
        <p className="card__text text-[1.2rem] leading-[1.6rem]">{tour.summary}</p>
        <div className="card__data text text-[1.2rem]">
          <svg className="card__icon">
            <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>{tour?.startLocation?.description}</span>
        </div>
        <div className="card__data text text-[1.2rem]">
          <svg className="card__icon">
            <use xlinkHref="/img/icons.svg#icon-calendar"></use>
          </svg>
          <span>{new Date().toLocaleString('en-us', {month:'long',year:'numeric'})}</span>
        </div>
        <div className="card__data text text-[1.2rem]">
          <svg className="card__icon">
            <use xlinkHref="/img/icons.svg#icon-flag"></use>
          </svg>
          <span>{tour?.locations?.length} stops</span>
        </div>
        <div className="card__data text text-[1.2rem]">
          <svg className="card__icon">
            <use xlinkHref="/img/icons.svg#icon-user"></use>
          </svg>
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer text-[1.2rem] px-[1.6rem] py-[1.6rem] gap-y-1">
        <p>
          <span className="card__footer-value">${tour.price} </span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{tour.ratingsAverage} </span>
          <span className="card__footer-text">rating ({tour.ratingsQuantity})</span>
        </p>
        <Link href={`/tour/${tour.slug}`}>
          <div className="btn btn--green btn--small btn--small-mini">Details</div>
        </Link>
      </div>

    </div>
  )
}

export default MiniCard