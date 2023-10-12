import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import { useAppDispatch } from '../app/hooks'
import { login } from '../slices/authSlice'
import { useRouter } from 'next/router'

export const Login = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [error, setError] = useState('')
  return (
    <div className="w-screen h-screen bg-light pt-20">
      <div className="card lg:w-1/2 md:w-3/4 w-[350px] m-auto">
        <h1>Log In</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await dispatch(login({ email: values.email, password: values.password })).unwrap()
              setSubmitting(false)
              void router.push('/')
            } catch (err) {
              switch (err.code) {
                case 'auth/invalid-login-credentials':
                  setError('Invalid login credentials')
                  break
                default:
                  setError('An error has occurred')
                  break
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col">
              <div className="my-2 w-full flex md:flex-row flex-col md:items-center justify-between">
                <label htmlFor="email">Email:</label>
                <Field type="text" name="email" className="md:w-4/5" onKeyUp={() => { setError('') }} />
              </div>
              <div className="my-2 w-full flex md:flex-row flex-col md:items-center justify-between">
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" className="md:w-4/5" onKeyUp={() => { setError('') }} />
              </div>
              {error.length > 0 && <span className="text-red mt-1">{error}</span>}
              <div className="my-2 w-full flex flex-row items-center justify-end">
                <Link href="/register" className="mr-6">Register</Link>
                <button className="self-end" type="submit" disabled={isSubmitting}>Log In</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
