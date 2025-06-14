'use client'
import { getRegions } from '@/app/service/region'
import { registerUser } from '@/app/service/user'
import { RegisterForm } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

interface Region {
  id: number
  name: string
}

const Register = () => {
  const { register, handleSubmit, control } = useForm<RegisterForm>()
  const [regions, setRegions] = useState<Region[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await getRegions()
        setRegions(res)
      } catch (error) {
        console.error('Error fetching regions:', error)
      }
    }

    fetchRegions()
  }, [])

  const onSubmit = async(data: RegisterForm) => {
    const res = await registerUser(data)
    if(!res.error){
      router.replace('/auth/login')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 space-y-4 w-[400px]"
      >
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <Input {...register('firstname')} placeholder="Enter your first name" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <Input {...register('lastname')} placeholder="Enter your last name" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input type="email" {...register('email')} placeholder="Enter your email" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <Input type="password" {...register('password')} placeholder="Enter your password" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Region</label>
          <Controller
            control={control}
            name="regionId"
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={String(region.id)}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <Input
            type="text"
            {...register('img')}
            placeholder="Enter your image URL"
          />
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
