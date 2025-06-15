"use client"

import { useRouter } from "next/navigation"
import FormSignUp from "./form";

const SignUnPage = () => {
    useRouter();
    return <FormSignUp/>
}

export default SignUnPage;