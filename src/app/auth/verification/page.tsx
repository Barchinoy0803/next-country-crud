'use client'
import React, { useEffect, useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { OTPVerification } from '@/app/types'
import { verifyOtp } from '@/app/service/user'

const Verification = () => {
  const { control, handleSubmit, setValue } = useForm<OTPVerification>()
  const { email } = useSelector((state: RootState) => state.auth)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (email) {
      setValue('email', email)
    }
  }, [email])

  const onSubmit = async (data: OTPVerification) => {
    setError('')
    const res = await verifyOtp(data)
    if (!res.error) {
      router.replace('/auth/register')
    } else {
      setError(res.message || 'Verification failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Verify Your Email</h2>
          <p className="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
        </div>

        <div className="flex flex-col items-center">
          <label className="mb-2 text-sm font-medium text-gray-700">Verification Code</label>
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Verification
