export default function Error({ error }) {
  return (
    <h1 className="absolute text-red-800 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-semibold text-4xl">
      {error?.message || "Something went wrong"}
    </h1>
  );
}
