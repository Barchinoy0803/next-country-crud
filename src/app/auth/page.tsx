'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { SendOtpType } from '../types'
import { sendOtp } from '../service/user'
import { useDispatch } from 'react-redux'
import { setEmail } from '../store/slices/authSlice'
import { useRouter } from 'next/navigation'

const SendOtp = () => {
  const { register, handleSubmit } = useForm<SendOtpType>()
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: SendOtpType) => {
    setLoading(true)
    const res = await sendOtp(data.email)
    
    if (res.otp) {
      dispatch(setEmail(data.email))
      router.replace('auth/verification')
    }
    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50 px-4'>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Email Verification</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your email to receive a one-time password (OTP)</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          Send
        </Button>
      </form>
    </div>
  )
}

export default SendOtp
