"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import FormSignUp from "./form";

const SignUnPage = () => {
    const router = useRouter()

    return <FormSignUp/>
}

export default SignUnPage;