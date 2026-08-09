import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    whatsapp_number: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: false,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never returned by default on queries
    },
    role: {
      type: String,
      enum: ["passenger", "driver", "manager", "captain", "admin"],
      default: "passenger",
    },
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_profile_completed: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    last_login: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

// Middleware / Hook: Hash password before saving, only if it was modified
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to verify a candidate password against the stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to check if user exists by WhatsApp number
userSchema.statics.isUserExists = async function (whatsapp_number) {
  const user = await this.findOne({ whatsapp_number, is_deleted: { $ne: true } });
  return !!user;
};

// Shape returned to the client - never expose the password hash
userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    phone: this.phone,
    whatsapp_number: this.whatsapp_number,
    email: this.email,
    role: this.role,
    full_name: this.full_name,
    is_active: this.is_active,
    is_profile_completed: this.is_profile_completed,
    last_login: this.last_login,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const User = mongoose.model("User", userSchema);

export default User;
