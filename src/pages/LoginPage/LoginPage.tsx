import NavBar from "../../components/Navbar/NavBar";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/TextInput/TextInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  type LoginRequest,
} from "../../services/authApi/authApi";
import { useAppDispatch } from "../../state/useAppDispatch";
import { setLoadingState } from "../../state/settings/settingsSlice";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoadingState({ isLoading }));
  }, [dispatch, isLoading]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data).unwrap();
      if (response.status) {
        toast.success("Login successful!");
        await navigate("/dashboard");
      } else throw new Error(response.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed!");
    }
  };

  const onAppendIconClick = () => setPasswordVisibility((state) => !state);

  return (
    <div>
      <div className={"w-screen h-screen bg-(--color-theme-bg) dot-bg"}>
        <div className={"flex flex-col w-screen h-screen"}>
          <div className={"w-full h-auto"}>
            <NavBar isHomeActive={true} isSignInActive={true} />
          </div>
          <div className={"w-full h-full relative"}>
            <div
              className={
                "  min-w-md min-h-fit max-w-2xl glass absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              }
            >
              <div className={"flex flex-col"}>
                <div className="mt-4">
                  <h3 className={"text-center text-white text-2xl mt-3"}>
                    Welcome Back
                  </h3>
                  <h4 className="text-center text-gray-200 text-xs mb-3 mt-1 font-extralight">
                    Sign in to your CVScreen Pro Account
                  </h4>
                </div>
                <div className="mt-15 px-15">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-md mx-auto"
                  >
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
                      onAppendClick={onAppendIconClick}
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
                      Sign In
                    </button>
                  </form>
                </div>
                <div className="mt-10 px-15 flex justify-center flex-col">
                  <hr className="w-full bg-gray-100 h-[2px]" />
                  <p className="mt-2 text-center text-gray-400 text-xs">
                    Don't have an account?{" "}
                    <span
                      className="text-blue-400 cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up here
                    </span>
                  </p>
                  <p
                    className="mt-1 mb-4 text-center text-xs text-blue-400 cursor-pointer"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot your password?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
