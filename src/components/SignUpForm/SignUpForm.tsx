import z from "zod";
import type { RegisterRequest } from "../../services/userApi/userApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faIdBadge,
  faLocationDot,
  faLock,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  designation: string;
  phoneNo: string;
  location: string;
};

const registerSchema = z
  .object({
    email: z.string("Email is required").trim().email("Invalid email"),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters"),
    confirmPassword: z
      .string("Confirm password is required")
      .min(8, "Confirm Password must be at least 8 characters")
      .max(50, "Confirm Password cannot exceed 50 characters"),
    designation: z.string().nonempty("Designation is required"),
    phoneNo: z
      .string("Phone number is required")
      .min(10, "Phone number must be at least 10 digits")
      .max(12, "Phone number cannot exceed 12 digits"),
    location: z.string().nonempty("Location is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormProps = {
  submitFormData: (data: RegisterRequest) => void;
};

const SignUpForm = ({ submitFormData }: SignUpFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const onSubmit = async (
    data: { confirmPassword: string } & RegisterRequest
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;
    submitFormData(rest);
  };

  const onPasswordClick = () => setPasswordVisibility((state) => !state);
  const onConfirmPasswordClick = () =>
    setConfirmPasswordVisibility((state) => !state);
  return (
    <>
      <div className={"flex flex-col glass pb-5"}>
        <div className="mt-4">
          <h3 className={"text-center text-white text-2xl mt-3"}>Sign Up</h3>
          <h4 className="text-center text-gray-200 text-xs mb-3 mt-1 font-extralight">
            Sign up for a CVScreen Pro Account
          </h4>
        </div>
        <div className="mt-15 px-15">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <TextInput
              label="Email"
              type="email"
              prependIcon={faEnvelope}
              {...register("email")}
              error={errors.email?.message}
              touched={touchedFields.email}
              placeholder="Enter your email"
              className="input"
            />

            <TextInput
              label="Password"
              type={passwordVisibility ? "text" : "password"}
              prependIcon={faLock}
              {...register("password")}
              error={errors.password?.message}
              touched={touchedFields.password}
              placeholder="Enter your password"
              className="input"
              appendIcon={passwordVisibility ? faEyeSlash : faEye}
              onAppendClick={onPasswordClick}
            />

            <TextInput
              label="Confirm Password"
              type={confirmPasswordVisibility ? "text" : "password"}
              prependIcon={faLock}
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              touched={touchedFields.confirmPassword}
              placeholder="Confirm password"
              className="input"
              appendIcon={confirmPasswordVisibility ? faEyeSlash : faEye}
              onAppendClick={onConfirmPasswordClick}
            />

            <TextInput
              label="Designation"
              type="text"
              prependIcon={faIdBadge}
              {...register("designation")}
              error={errors.designation?.message}
              touched={touchedFields.designation}
              placeholder="Enter your designation"
              className="input"
            />

            <TextInput
              label="Mobile"
              type="number"
              prependIcon={faMobile}
              {...register("phoneNo")}
              error={errors.phoneNo?.message}
              touched={touchedFields.phoneNo}
              placeholder="000 0000 000"
              className="input"
            />

            <TextInput
              label="Location"
              type="text"
              prependIcon={faLocationDot}
              {...register("location")}
              error={errors.location?.message}
              touched={touchedFields.location}
              placeholder="Enter your location"
              className="input"
            />

            <button
              type="submit"
              className={`mt-8 p-2 w-full  rounded-2xl text-white text-sm text-center ${
                !isValid
                  ? "cursor-not-allowed bg-gray-600"
                  : "cursor-pointer bg-gradient-to-r from-g-start to-g-end"
              }`}
              disabled={!isValid}
            >
              Proceed to Payment
            </button>
          </form>
        </div>
        <div className="mt-10 px-15 flex justify-center flex-col">
          <hr className="w-full bg-gray-100 h-[2px]" />
          <p className="mt-2 text-center text-gray-400 text-xs">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In here
            </span>
          </p>
        </div>
      </div>
      <div className="h-[25px] absolute">&nbsp;</div>
    </>
  );
};

export default SignUpForm;
