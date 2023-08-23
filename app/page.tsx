'use client'

import SignupAuth from "./(site)/components/Auth/SignupAuth/SignupAuth";
import { useRouter } from "next/navigation";

import { useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function Home() {


    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session.status == "authenticated") {
            console.log("Hello")
            router.push("/v1/user")
        }
    }, [session?.status, router])

    return (

        <>
           
                <SignupAuth />
           

        </>

    )
}