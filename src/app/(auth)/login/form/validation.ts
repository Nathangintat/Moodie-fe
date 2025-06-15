import { z } from "zod";

export const formSchema = z.object({
    email: z.string({required_error: 'Oops! you forgot the email'}).email({message: 'Oops! your format is wrong'}),
    password: z.string({required_error: 'the minimum is 8 letter'}).min(8)
})