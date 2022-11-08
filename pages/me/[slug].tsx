import React from 'react'
import Link from "next/link"
import { useTourskyStore } from '../../src/zustand'
import Settings from '../components/Settings'
import Bookings from '../components/Bookings'
import Reviews from '../components/Reviews'
import Billings from '../components/Billings'
 
const Me = ({slug}:{slug:string}) => {

    const { navigator } = useTourskyStore()

    const switchIntefraces = () => {
        switch (slug) {
            case "settings":
                return <Settings />
            case "my-bookings":
                return <Bookings />
            case "my-reviews":
                return <Reviews />
            case "billing":
                return <Billings />
            default:
                return <Settings />
        }
    }

    return (
        <main className="main">
            <div className="user-view">
                <nav className="user-view__menu">
                    <ul className="side-nav">
                        {/* {navigator.map(nav => <li className={nav.slug === slug ? "side-nav--active" : ""}><a href={`/me/${nav.slug}`}><svg><use xlinkHref={`/img/icons.svg#${nav.icon}`}></use></svg>{nav.name}</a></li>)} */}
                        {navigator.map((nav,index) => 
                            <li key={index} className={nav.slug === slug ? "side-nav--active" : ""}>
                                <Link href={`/me/${nav.slug}`}>
                                    <a>
                                        <svg>
                                            <use xlinkHref={`/img/icons.svg#${nav.icon}`}></use>
                                        </svg>
                                        {nav.name}
                                    </a>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {switchIntefraces()}

            </div>
        </main>
    );
}

export default Me

interface Params {
    params: {
        slug: string
    }
}

export const getStaticPaths = async () => {

    const paths = useTourskyStore.getState().navigator.map(({slug}) => ({
        params: { slug },
    }))
    
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}:Params) => {
    return {
        props: { slug: params.slug },
        revalidate: 60,
    }
}