import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    whatsapp_number: z
      .string({
        required_error: "WhatsApp number is required",
      })
      .min(1, "WhatsApp number is required"),

    full_name: z
      .string({
        required_error: "Full name is required",
      })
      .min(1, "Full name is required"),

    phone: z.string().optional(),

    email: z
      .string()
      .email("Enter a valid email address")
      .trim()
      .toLowerCase()
      .optional()
      .or(z.literal("")),

    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password can not be more than 20 characters"),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    whatsapp_number: z
      .string({
        required_error: "WhatsApp number is required",
      })
      .min(1, "WhatsApp number is required"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required"),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    phone: z.string().optional(),
    whatsapp_number: z.string().optional(),
    email: z
      .string()
      .email("Enter a valid email address")
      .trim()
      .toLowerCase()
      .optional()
      .or(z.literal("")),
    password: z.string().min(6).optional(),
    role: z.enum(["passenger", "driver", "manager", "captain", "admin"]).optional(),
    full_name: z.string().optional(),
    is_active: z.boolean().optional(),
    is_profile_completed: z.boolean().optional(),
  }),
});

export const userValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
  updateUserValidationSchema,
};
