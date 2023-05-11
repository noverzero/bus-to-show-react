import { create } from 'zustand'

export const useStore = create((set) => ({
  btsUser: {
    isLoggedIn: false,
    userID: '1',
    name: 'guest',
    email: '',
    picture: '',
    userDetails: {},
  },
  setBtsUser: (user) => set((state) => ({ btsUser: user })),

  displayLoadingScreen: false,
  setDisplayLoadingScreen: (bool) => set((state) => ({ displayLoadingScreen: bool })),

  displayBus1: true,
  setDisplayBus1: (bool) => set((state) => ({ displayBus1: bool })),

  headerHidden: false,
  setHideHeader: (bool) => set((state) => ({ headerHidden: bool })),

  isCheckedUseSeasonPass: false, 
  toggleIsCheckedUseSeasonPass: (bool) => set((state) => ({ headerHidden: bool })),

  selectedDevent: {},
  setSelectedDevent: (devent) => set((state) => ({ selectedDevent: devent })),

  showForgotForm: false,
  toggleShowForgotForm: (bool) => set((state) => ({ showForgotForm: bool })),

  passStatus: {},
  setPassStatus: (status) => set((state) => ({ passStatus: status })),

  userReservations: [],
  setUserReservations: (reservations) => set((state) => ({ userReservations: reservations })),

  displayUserReservationSummary: false,
  setDisplayUserReservationSummary: (bool) => set((state) => ({ displayUserReservationSummary: bool })),

  reservationDetail: null,
  //userReservations.find(show => (parseInt(show.eventsId) === parseInt(e.target.id)))  <<-- pass this in as the reservationDetail
  setReservationDetail: (reservation) => set((state) => ({ reservationDetail: reservation })),

  displayReservationDetail: false,
  setDisplayReservationDetail: (bool) => set((state) => ({ displayReservationDetail: bool })),

  displayEditSuccess: false,
  setDisplayEditSuccess: (bool) => set((state) => ({ displayEditSuccess: bool })),

  displayEditReservation: false,
  setDisplayEditReservation: (bool) => set((state) => ({ displayEditReservation: bool })),


}))