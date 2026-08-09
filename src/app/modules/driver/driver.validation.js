import { z } from "zod";

const optionalDateSchema = z
  .union([
    z.date(),
    z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .transform((val) => new Date(val)),
  ])
  .optional();

const updateDriverProfileValidationSchema = z.object({
  body: z.object({
    phone: z.string().trim().optional(),
    email: z.string().email("Invalid email address").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    date_of_birth: optionalDateSchema,
    district: z.string().optional(),
    present_address: z.string().optional(),
    permanent_address: z.string().optional(),
    profile_photo: z.string().optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),

    driving_experience_years: z.number().min(0).optional(),
    intercity_experience_years: z.number().min(0).optional(),
    preferred_routes: z.array(z.string()).optional(),

    nid_number: z.string().optional(),
    nid_front: z.string().optional(),
    nid_back: z.string().optional(),
    nid_verified: z.boolean().optional(),

    driving_license_number: z.string().optional(),
    driving_license_type: z.enum(["professional", "non_professional"]).optional(),
    driving_license_front: z.string().optional(),
    driving_license_back: z.string().optional(),
    driving_license_expiry_date: optionalDateSchema,
    driving_license_verified: z.boolean().optional(),

    emergency_contact: z
      .object({
        name: z.string().optional(),
        relationship: z.string().optional(),
        phone: z.string().optional(),
      })
      .optional(),

    vehicle: z
      .object({
        type: z.enum(["private_car", "microbus", "hiace", "suv", "other"]).optional(),
        brand: z.string().optional(),
        model: z.string().optional(),
        year: z.number().optional(),
        color: z.string().optional(),
        registration_number: z.string().optional(),
        passenger_capacity: z.number().min(1).optional(),

        ownership_type: z
          .enum(["owner", "family_owned", "rented", "company_owned", "other"])
          .optional(),
        owner_name: z.string().optional(),
        owner_phone: z.string().optional(),
        owner_nid: z.string().optional(),

        registration_document: z.string().optional(),
        tax_token: z.string().optional(),
        tax_token_expiry_date: optionalDateSchema,
        fitness_certificate: z.string().optional(),
        fitness_expiry_date: optionalDateSchema,
        insurance_document: z.string().optional(),
        insurance_expiry_date: optionalDateSchema,
        vehicle_verified: z.boolean().optional(),
      })
      .optional(),

    is_verified: z.boolean().optional(),
    verification_status: z
      .enum(["not_started", "pending", "under_review", "verified", "rejected"])
      .optional(),
    verification_rejection_reason: z.string().optional(),

    profile_complete: z.boolean().optional(),
    profile_completion_percentage: z.number().min(0).max(100).optional(),

    rating: z.number().min(0).max(5).optional(),
    total_ratings: z.number().optional(),
    completed_trips: z.number().optional(),
    cancelled_trips: z.number().optional(),

    is_active: z.boolean().optional(),
    is_suspended: z.boolean().optional(),
    suspended_reason: z.string().optional(),

    dynamic_attributes: z.record(z.any()).optional(),
  }),
});

export const driverValidations = {
  updateDriverProfileValidationSchema,
};
