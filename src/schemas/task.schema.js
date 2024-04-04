import { z } from "zod";

export const createtaskSchema = z.object({
    title: z.string({
        required_error: "Task title is required",
    }),
    description: z.string({
        required_error: "Task description is required",
    }),
    date: z.string({
        required_error: "Task date is required",
    }).datetime().optional(),
})