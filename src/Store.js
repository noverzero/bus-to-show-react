import { create } from 'zustand'

export const useStore = create((set) => ({
  btsUser: {
    isLoggedIn: false,
    userID: '',
    name: '',
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

  showForgotForm: false,
  toggleShowForgotForm: (bool) => set((state) => ({ showForgotForm: bool })),
}))