import create from "zustand"
import { Store, TypeAlert, Tour, User } from '../typings'



export const useTourskyStore = create((set:any) => ({
    authenticator: false,
    setAuthenticator: (stats:boolean) => set((state:Store) => ({...state, authenticator:stats})),
    user: {_id: "", name: "", email: "", photo: ""},
    setUser: (user:User) => set((state:Store) => ({...state, user})),
    tours: [],
    setTours: (tours:Tour[]) => set((state:Store) => ({...state, tours})),
    alertPopup: { status: false, type: "success", message: "" },
    setAlertPopup: (alert:any) => set((state:Store) => ({...state,alertPopup:alert})),
    navigator: [
        {slug:"settings",name:"Settings",icon:"icon-settings"},
        {slug:"my-bookings",name:"My bookings",icon:"icon-briefcase"},
        {slug:"my-reviews",name:"My reviews",icon:"icon-star"},
        {slug:"billing",name:"Billing",icon:"icon-credit-card"}
    ],
    stripe: {},
    setStripe: (obj:any) => set((state:Store) => ({...state, stripe:obj})),
}));