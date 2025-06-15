import { z } from "zod";

export const formSchema = z.object({
    username: z.string({ required_error: "Username is required" }).min(3, "Username must be at least 3 characters"),
    email: z
        .string({ required_error: "Oops! you forgot the email" })
        .email({ message: "Oops! your format is wrong" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "The minimum is 8 letters" }),
});
