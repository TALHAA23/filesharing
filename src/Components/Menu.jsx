import { Link } from "react-router-dom";
export default function Menu() {
  return (
    <div className="w-full my-1 px-2  flex flex-col sm:flex-row justify-center items-center gap-1">
      {["My Files", "receives"].map((el) => (
        <Link
          key={el}
          to={el == "My Files" ? "/" : `./${el.toLocaleLowerCase()}`}
          className=" w-full max-w-[400px] py-3 text-center uppercase rounded font-medium text-white bg-[#4F46E5] hover:bg-[#4e46e5e9]"
        >
          {el}
        </Link>
      ))}
    </div>
  );
}
