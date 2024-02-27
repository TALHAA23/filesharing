import { useMutation } from "@tanstack/react-query";
import loginUser from "../utils/login";
import { Link, useNavigate } from "react-router-dom";
import createUser from "../utils/signup";
import { useEffect } from "react";

const isSignupPage = () => location.pathname.split("/").pop() == "signup";

export default function Auth() {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationKey: ["auth"],
    mutationFn: handleSubmit,
  });
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    try {
      const response = isSignupPage()
        ? await createUser(email, password, username)
        : await loginUser(email, password);
      return response;
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    isSuccess && navigate("/");
  }, [isSuccess]);

  return (
    <form onSubmit={mutate} className="form">
      <p className="form-title">
        {isSignupPage() ? "Sign up a new account" : "Login to your account"}
      </p>
      {isPending && (
        <h2 className="text-center text-sm font-semibold my-2">Please Wait</h2>
      )}
      {isError && (
        <h2 className="text-center text-red-600 text-sm font-semibold my-2">
          {error.message}
        </h2>
      )}

      {isSignupPage() && (
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            required
          />
          <span></span>
        </div>
      )}
      <div className="input-container">
        <input type="email" name="email" placeholder="Enter email" required />
        <span></span>
      </div>
      <div className="input-container">
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
      </div>
      <button
        type="submit"
        className="submit disabled:opacity-40"
        disabled={isPending}
      >
        {isPending ? "Proccssing" : isSignupPage() ? " Sign up" : "Login"}
      </button>

      <p className="signup-link">
        {isSignupPage() ? "Have an account" : "No account"}?
        <Link to={`/auth/${isSignupPage() ? "login" : "signup"}`}>
          {" "}
          {isSignupPage() ? " Login" : "sign up"}
        </Link>
      </p>
    </form>
  );
}
