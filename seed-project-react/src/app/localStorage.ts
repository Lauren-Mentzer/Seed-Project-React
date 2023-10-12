import { setLoggedIn } from '../slices/authSlice'
import { auth } from './firebase'

const useLocalStorage = (dispatch): void => {
  auth.onAuthStateChanged(user => {
    if (user !== null && typeof window !== 'undefined') {
      localStorage.setItem('checkin.expectSignIn', '1')
      dispatch(setLoggedIn({ loggedIn: true }))
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('checkin.expectSignIn')
      dispatch(setLoggedIn({ loggedIn: false }))
    }
  })
}

export default useLocalStorage
