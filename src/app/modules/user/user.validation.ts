import { z } from 'zod';

const isAlphabetic = (value: string) => {
    const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    return firstNameStr === value
};

const userNameSchema = z.object({
    firstName: z.string().min(1).refine(isAlphabetic, {
        message: "First name must contain only alphabetical characters",
    }),
    lastName: z.string().min(1).refine(isAlphabetic, {
        message: "Last name must contain only alphabetical characters",
    }),
    // _id: z.boolean(),
});

const userAddressSchema = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    // _id: z.boolean(),
});

const orderSchema = z.object({
    productName: z.string().min(1),
    price: z.number(),
    quantity: z.number(),
    // _id: z.boolean()
});

const userSchema = z.object({
    userId: z.number(),
    username: z.string().min(1),
    password: z.string().min(1),
    fullName: userNameSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean().default(true),
    hobbies: z.array(z.string()),
    address: userAddressSchema,
    orders: z.array(orderSchema).optional(),
});

export default userSchema;