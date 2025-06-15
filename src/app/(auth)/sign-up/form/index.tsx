"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/../lib/axios";
import { setCookie } from "cookies-next";
import {formSchema} from "@/../src/app/(auth)/sign-up/form/validation";

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

const FormSignUp = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const validation = formSchema.safeParse({
            username,
            email,
            password,
        });

        if (!validation.success) {
            const errorMessages = validation.error.issues.map((issue) => issue.message);
            setError(errorMessages);
            return;
        }

        try {
            const response = await axiosInstance.post('/register', {
                username,
                email,
                password
            });

            alert("Registration successful! Please sign in.");
            router.push('/login');
        } catch (err) {
            setError(['Registration failed. Please check your input or try again later.']);
        }
    };

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
                    <h2 className="text-[32px] font-bold text-[#2B0D62] mb-2">Sign up</h2>
                    <p className="text-[#2B0D62]/80 text-base mb-8">
                        Already have an account?{" "}
                        <a href="/login" className="text-[#2B0D62] font-semibold underline">
                            Sign in
                        </a>
                    </p>

                    {error.length > 0 && (
                        <div className="bg-purple-500 w-full p-4 rounded-lg text-white mb-6">
                            <div className="font-bold mb-2">Error</div>
                            <ul className="list-disc list-inside">
                                {error.map((err, idx) => <li key={idx}>{err}</li>)}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-white/50 placeholder:text-gray-400"
                        />
                        <Input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white/50 placeholder:text-gray-400"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/50 placeholder:text-gray-400"
                        />
                        <Button
                            type="submit"
                            className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right Side */}
            <div style={{background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',}} className="hidden md:flex w-1/2 text-white items-center justify-center px-10 py-20">
                <div className="text-center space-y-6 max-w-md">
                    <h1 className="text-[70px] font-extrabold h-20">
                        Mood<span className="italic text-[#D0BFFF]">ie</span>
                    </h1>
                    <p className="uppercase text-sm tracking-wide">EXPLORE MOODS. DISCOVER FILMS</p>

                    <div className="space-y-4 mt-6">
                        <img
                            src={slides[currentSlide].image}
                            alt={`Slide ${currentSlide + 1}`}
                            className="h-84 mx-auto"
                        />
                        <p className="text-[22px] font-bold">{slides[currentSlide].title}</p>
                        <p className="text-sm text-white/80">{slides[currentSlide].description}</p>
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
    );
};

export default FormSignUp;
