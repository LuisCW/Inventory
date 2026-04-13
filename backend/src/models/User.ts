import bcrypt from "bcryptjs";
import { CallbackWithoutResultAndOptionalError, Document, Schema, model } from "mongoose";

export type IUserRole = "ADMIN" | "USER";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: IUserRole;
  active: boolean;
  creationAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["ADMIN", "USER"], required: true, default: "USER" },
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: { createdAt: "creationAt", updatedAt: "updatedAt" },
    versionKey: false,
  }
);

userSchema.pre("save", async function hashPassword(this: IUser, next: CallbackWithoutResultAndOptionalError) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
