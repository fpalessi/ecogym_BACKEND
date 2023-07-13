import mongoose from "mongoose";
import { hashPassword } from "../utils/auth";

export interface User {
  fullName: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<User>(
  {
    fullName: {
      type: String,
      required: [true, "El nombre completo es obligatorio"],
      trim: true,
      minLength: 1,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Email es obligatorio"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Contraseña es obligatoria"],
      minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  this.password = await hashPassword(this.password);
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
