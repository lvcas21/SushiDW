import {string, z} from 'zod'

export const productoSchema = z.object({
  productId: z.string().min(1),
});

export const carritoSchema = z.object({
  items: z.array(productoSchema),
  userId: z.string().min(1),
});

