import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useLoginMutation,
  useSignupMutation,
} from "../services/api/authApiSlice";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

function LoginSignUpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, formState, getValues, handleSubmit, reset, setError } =
    useForm();

  const [
    login,
    { data: dataLogin, isLoading: isLoadingLogin, isError: isErrorLogin },
  ] = useLoginMutation();
  const [
    signup,
    { data: dataSignup, isLoading: isLoadingSignup, isError: isErrorSignup },
  ] = useSignupMutation();

  const { errors } = formState;

  async function onSubmit({ email, password, passwordConfirm }) {
    try {
      location.pathname === "/login"
        ? await login({ email, password }).unwrap()
        : await signup({ email, password, passwordConfirm }).unwrap();

      toast.success("User successful");

      navigate("/");
    } catch (err) {
      err.status === 401
        ? toast.error("User does not exist, try again")
        : err.data.error.name === "ValidationError"
          ? toast.error("The two passwords should match")
          : "";
    }
  }

  console.log(isErrorLogin);

  if (isLoadingLogin || isLoadingSignup) return <Loader />;

  return (
    <div className="h-full w-full mb-auto mt-[5rem] flex flex-col items-center gap-[3rem] max-w-lg mx-auto text-[1rem]">
      <img src="./assets/logo.svg" alt="Logo" className="w-[2rem] h-[1.6rem]" />

      <div className="bg-accent w-[20.5rem] sm:w-[25rem] px-7 py-11 font-light font-outfit rounded-xl">
        <h2 className="text-white text-[2rem] capitalize">
          {location.pathname === "/login" ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start"
        >
          <div className="flex flex-col gap-[1rem] mt-[1.5rem] mb-[2.5rem] w-full">
            <div className="border-solid border-b-[1px] border-b-display px-3 py-3">
              <input
                type="email"
                placeholder="Email address"
                required
                className="bg-transparent w-full outline-none text-white opacity-[0.5]"
                {...register("email")}
              />
              {errors?.email && <span>{errors.email.message}</span>}
            </div>

            <div className="border-solid w-full border-b-[1px] border-b-display px-3 py-3">
              <input
                type="password"
                placeholder="Password"
                required
                className="bg-inherit outline-none text-white opacity-[0.5]"
                {...register("password")}
              />
              {errors?.password && <span>{errors.password.message}</span>}
            </div>

            {location.pathname === "/signup" && (
              <div className="border-solid border-b-[1px] border-b-display px-3 py-3">
                <input
                  type="password"
                  placeholder="Repeat Password"
                  required
                  className="bg-inherit w-full outline-none text-white opacity-[0.5]"
                  {...register("passwordConfirm")}
                />
                {errors?.passwordConfirm && (
                  <span>{errors.passwordConfirm.message}</span>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary w-full text-white py-4 px-2 rounded-md"
            disabled={isLoadingLogin || isLoadingSignup}
          >
            {location.pathname === "/login"
              ? "Login to your account"
              : "Create an account"}
          </button>

          <div className="w-full flex gap-[1rem] mt-[1.5rem] text-center justify-center text-white">
            <p>
              {location.pathname === "/login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="text-primary"
              to={location.pathname === "/login" ? "/signup" : "/login"}
            >
              {location.pathname === "/login" ? "Sign Up" : "Login"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignUpPage;
