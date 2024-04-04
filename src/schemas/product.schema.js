import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string({
        required_error: "Product title is required",
    }),
    description: z.string({
        required_error: "Product description is required",
    }),
    price: z.number({
        required_error: "Product price is required",
    }).min(0, {
        required_error: "Product price must be greater than 0",
    })
})