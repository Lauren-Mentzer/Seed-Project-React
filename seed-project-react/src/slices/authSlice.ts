import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../app/firebase'

interface AuthState {
  loggedIn: boolean
}

const initialState: AuthState = { loggedIn: false }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload.loggedIn
    }
  },
  extraReducers (builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loggedIn = action.payload !== null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = action.payload !== null
      })
      .addCase(logout.fulfilled, (state, _action) => {
        state.loggedIn = false
      })
  }
})

export const register = createAsyncThunk('auth/register', async ({ email, password }: { email: string, password: string }) => {
  await setPersistence(auth, browserLocalPersistence)
  const response = await createUserWithEmailAndPassword(auth, email, password)
  return response.user.email
})

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string, password: string }) => {
  await setPersistence(auth, browserLocalPersistence)
  const response = await signInWithEmailAndPassword(auth, email, password)
  return response.user.email
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth)
})

export const { setLoggedIn } = slice.actions

export default slice.reducer
