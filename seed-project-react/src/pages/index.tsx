import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import useLocalStorage from '../app/localStorage'
import { logout } from '../slices/authSlice'

export default function Home (): JSX.Element {
  const router = useRouter()
  const dispatch = useAppDispatch()
  useLocalStorage(dispatch)
  const isLoggedIn = useAppSelector(state => state.auth.loggedIn)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('checkin.expectSignIn') !== '1') void router.push('/login')
    }
  }, [])

  const handleLogout = (): void => {
    void dispatch(logout())
    void router.push('/login')
  }

  if (isLoggedIn) {
    return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between items-center">
        <h1>Seed Project</h1>
        <button className="btn-invert" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
    )
  } else {
    return (
      <div><span>loading</span></div>
    )
  }
}
