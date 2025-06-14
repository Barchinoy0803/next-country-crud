'use client'
import { login } from '@/app/service/user'
import { LoginForm } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Register = () => {
  const { register, handleSubmit } = useForm<LoginForm>()
  const router = useRouter()

  const onSubmit = async(data: LoginForm) => {
    const res = await login(data)
    if(res.token){
      localStorage.setItem('token', res.token)
      router.replace('/')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 space-y-4 w-[400px]"
      >
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input type="email" {...register('email')} placeholder="Enter your email" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <Input type="password" {...register('password')} placeholder="Enter your password" />
        </div>
        <p>If you dont have a account: <a href='/auth' className='text-blue-500'>Register</a></p>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Register
