'use client'

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Images from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";


type Inputs = {
    email: string,
    password: String
}



const LoginAuth = () => {

    
    const session = useSession()
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<Inputs>()


    useEffect( () => {
        if(session.status == "authenticated"){
            router.push("/v1/users")
        }
    }, [session?.status, router])

    const handleChanges = () => {
        setErrorMessage(null)
        setSuccessMessage(null)

    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setIsLoading(true)

         await signIn( "credentials", { 
                ...data,
                redirect: (false)
            }).then((callback) => {
                if(callback?.error){
                    setErrorMessage((callback?.error))
                }
                if(callback?.ok && !callback?.error){
                    setSuccessMessage("User login successfully")
                    router.push("/v1/user")
                }
            }).finally(() => setIsLoading(false))
       
    }

    return (
        <div className="flex justify-center items-center flex-col py-12 sm:px-6 lg:px-8 min-h-full bg-[#F5F5F5]">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">

                <img
                    className="mx-auto h-20 w-auto" src="/images/tf-logo.png" title="Talkfusion Logo" />

                <div className="flex item-center justify-center">
                    <h1 className="text-center text-xl py-4 font-semibold">Login</h1>
                </div>

                <form noValidate onChange={handleChanges} className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                {
                                ...register(
                                    "email",
                                    {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address"
                                        }

                                    })}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {
                            errors.email && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )
                        }

                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {
                            errors.password && (
                                <p className="text-red-500">{errors.password.message}</p>
                            )
                        }
                    </div>

                    <div>
                        <button
                            disabled={isLoading ? true : false}
                            type="submit"
                            className={` ${isLoading ? 'hidden' : ''} flex w-full cursor-pointer justify-center rounded-md bg-[#007B83] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-[#007a83ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            Login
                        </button>

                        <button
                            disabled={isLoading ? true : false}
                            type="submit"
                            className={`${isLoading ? '' : 'hidden'} w-full justify-center rounded-md bg-[#007B83] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>

                        </button>
                    </div>
                </form>

                <div className={`${errorMessage == null ? 'hidden' : ''} bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-5 rounded relative`} role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>

                <div className={`${successMessage == null ? 'hidden' : ''} bg-green-50 border border-green-400 text-green-700 px-4 py-2 mt-5 rounded relative`} role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/" className="font-semibold leading-6 text-[#007B83] underline hover:text-[#007a83ee]">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginAuth;