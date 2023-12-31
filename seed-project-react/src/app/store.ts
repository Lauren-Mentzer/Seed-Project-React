import {
  type Action,
  configureStore,
  type ThunkAction
} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
