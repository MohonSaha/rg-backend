import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    // ================================
    // USER
    // ================================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // ================================
    // BASIC INFORMATION
    // ================================
    phone: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },

    date_of_birth: {
      type: Date,
      required: false,
    },

    district: {
      type: String,
      required: false,
    },

    present_address: {
      type: String,
      required: false,
    },

    permanent_address: {
      type: String,
      required: false,
    },

    profile_photo: {
      type: String,
      required: false,
    },

    bio: {
      type: String,
      required: false,
      maxlength: 500,
    },

    // ================================
    // DRIVER INFORMATION
    // ================================
    driving_experience_years: {
      type: Number,
      required: false,
      min: 0,
    },


    // ================================
    // IDENTITY VERIFICATION
    // ================================
    nid_number: {
      type: String,
      required: false,
    },

    nid_front: {
      type: String,
      required: false,
    },

    nid_back: {
      type: String,
      required: false,
    },

    nid_verified: {
      type: Boolean,
      default: false,
    },

    // ================================
    // DRIVING LICENSE
    // ================================
    driving_license_number: {
      type: String,
      required: false,
    },

    driving_license_type: {
      type: String,
      enum: ["professional", "non_professional"],
      required: false,
    },

    driving_license_front: {
      type: String,
      required: false,
    },

    driving_license_back: {
      type: String,
      required: false,
    },

    driving_license_expiry_date: {
      type: Date,
      required: false,
    },

    driving_license_verified: {
      type: Boolean,
      default: false,
    },

    // ================================
    // EMERGENCY CONTACT
    // ================================
    emergency_contact: {
      name: {
        type: String,
        required: false,
      },

      relationship: {
        type: String,
        required: false,
      },

      phone: {
        type: String,
        required: false,
      },
    },

    // ================================
    // VEHICLE
    // ================================
    vehicle: {
      type: {
        type: String,
        enum: ["private_car", "microbus", "hiace", "suv", "other"],
        required: false,
      },

      brand: {
        type: String,
        required: false,
      },

      model: {
        type: String,
        required: false,
      },

      year: {
        type: Number,
        required: false,
      },

      color: {
        type: String,
        required: false,
      },

      registration_number: {
        type: String,
        required: false,
      },

      passenger_capacity: {
        type: Number,
        required: false,
        min: 1,
      },

      // ----------------------------
      // Vehicle Ownership
      // ----------------------------
      ownership_type: {
        type: String,
        enum: ["owner", "family_owned", "rented", "company_owned", "other"],
        required: false,
      },

      owner_name: {
        type: String,
        required: false,
      },

      owner_phone: {
        type: String,
        required: false,
      },


      // ----------------------------
      // Vehicle Documents
      // ----------------------------
      registration_document: {
        type: String,
        required: false,
      },

      vehicle_verified: {
        type: Boolean,
        default: false,
      },
    },

    // ================================
    // VERIFICATION
    // ================================
    is_verified: {
      type: Boolean,
      default: false,
    },

    verification_status: {
      type: String,
      enum: ["not_started", "pending", "under_review", "verified", "rejected"],
      default: "not_started",
    },

    verification_rejection_reason: {
      type: String,
      required: false,
    },

    // ================================
    // PROFILE COMPLETION
    // ================================
    profile_complete: {
      type: Boolean,
      default: false,
    },

    profile_completion_percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // ================================
    // DRIVER PERFORMANCE
    // ================================
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    total_ratings: {
      type: Number,
      default: 0,
    },

    completed_trips: {
      type: Number,
      default: 0,
    },

    cancelled_trips: {
      type: Number,
      default: 0,
    },

    // ================================
    // ACCOUNT STATUS
    // ================================
    is_active: {
      type: Boolean,
      default: true,
    },

    is_suspended: {
      type: Boolean,
      default: false,
    },

    suspended_reason: {
      type: String,
      required: false,
    },

    // ================================
    // FUTURE / FLEXIBLE DATA
    // ================================
    dynamic_attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
