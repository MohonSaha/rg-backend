import { z } from "zod";

const updatePassengerProfileValidationSchema = z.object({
  body: z.object({
    phone: z.string().trim().optional(),
    email: z.string().email("Invalid email address").optional(),
    gender: z.string().optional(),
    district: z.string().optional(),
    bio: z.string().optional(),
    nid_front: z.string().optional(),
    nid_back: z.string().optional(),
    is_verified: z.boolean().optional(),
    profile_complete: z.boolean().optional(),
    dynamic_attributes: z.record(z.any()).optional(),
  }),
});

export const passengerValidations = {
  updatePassengerProfileValidationSchema,
};
