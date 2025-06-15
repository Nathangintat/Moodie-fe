"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"
import React, {useEffect, useState} from "react";
import { useFormStatus } from "react-dom";
import { formSchema } from "./validation";
import axiosInstance from "../../../../../lib/axios";
import { setCookie } from "cookies-next";

const slides = [
    {
        image: "/buble-chat.png",
        title: "Track the Movies You Watch",
        description: "Build your personal movie playlist, just like social media, made for film lovers.",
    },
    {
        image: "/file.png",
        title: "Your Movie World. Connected.",
        description: "Every film tells a story, now keep your story remembered, one movie at a time.",
    },
    {
        image: "/film.png",
        title: "Discuss. Rate. Recommend.",
        description: "Start conversations, rate with purpose, and inspire someone’s next watch.",
    },
];


const SubmitButton = () => {
    const {pending} = useFormStatus()

    return (
        <Button
            disabled={pending} className="w-full bg-purple-700 hover:bg-purple-800" type="submit">
            {pending ? 'Loading...': 'Submit'}
        </Button>
    )
}

const FormSignIn = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const validation = formSchema.safeParse({
            email,
            password,
        })

        if (!validation.success) {
            const errorMessage = validation.error.issues.map((issue) => issue.message)
            setError(errorMessage)
            return;
        }

        await axiosInstance.post('/login', {email: email, password: password})
            .then((response) => {
                setCookie('accessToken', response.data.access_token)
                router.push('/dashboard/review');
            }).catch((error) => {
                setError(['Login error check your email and password.'])
                return;
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 lg:px-36 bg-[#F1EDFD]">
                <div className="w-full max-w-md">
                    <h2 className="text-[32px] font-bold text-[#2B0D62] mb-2">Sign in</h2>
                    <p className="text-[#2B0D62]/80 text-base mb-8">
                        Don’t have an account?{" "}
                        <a href="/sign-up" className="text-[#2B0D62] font-semibold">
                            Create now
                        </a>
                    </p>

                    {error.length > 0 && (
                        <div className="bg-purple-500 w-full p-4 rounded-lg text-white mb-6">
                            <div className="font-bold mb-2">Error Message</div>
                            <ul className="list-disc list-inside">
                                {error.map((value, index) => (
                                    <li key={index}>{value}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="E-mail..."
                            name="email"
                            className="bg-white/50 placeholder:text-gray-400"
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password..."
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            className="bg-white/50 placeholder:text-gray-400"
                            required
                        />
                        <SubmitButton/>
                    </form>
                </div>
            </div>

            {/* Right Side */}
            <div
                style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}}
                className="hidden md:flex w-1/2 text-white items-center justify-center px-10 py-20 transition-all duration-700 ease-in-out">
                <div className="text-center space-y-6 max-w-md">
                    <div className="h-42">
                    <h1 className="h-20 text-[70px] text-5xl font-extrabold">
                        Mood<span className="italic text-[#D0BFFF]">ie</span>
                    </h1>
                    <p className="uppercase text-sm tracking-wide">EXPLORE MOODS. DISCOVER FILMS</p>
                    </div>

                    <div className="space-y-4 mt-6">
                        <img
                            src={slides[currentSlide].image}
                            alt={`Slide ${currentSlide + 1}`}
                            className="h-84 mx-auto"
                        />
                        <p className="text-[22px] font-bold leading-tight">Track the Movies You Watch</p>
                        <p className="text-sm text-white/80">
                            Build your personal movie playlist, just like social media, made for film lovers.
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center space-x-3">
                        {slides.map((_, idx) => (
                            <span
                                key={idx}
                                className={`w-3 h-3 rounded-full ${
                                    idx === currentSlide ? "bg-white" : "bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormSignIn;