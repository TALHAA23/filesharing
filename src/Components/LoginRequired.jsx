import { Link } from "react-router-dom";

export default function LoginRequired({ message }) {
  return (
    <div className=" absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-3 my-4">
      <h1 className="font-semibold text-4xl text-center">{message}</h1>
      <Link
        to="/auth/login"
        className=" w-[90%] max-w-[400px] text-center py-2 rounded text-lg font-semibold border-2 border-[#4F46E5]"
      >
        Sign In
      </Link>
    </div>
  );
}
