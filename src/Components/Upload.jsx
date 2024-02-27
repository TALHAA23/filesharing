import { useEffect, useRef, useState } from "react";
import { useUser } from "../Hooks/UserProvider";
import uploadFile from "../utils/uploadFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import hideBox from "../assets/hideBox";
export default function Upload() {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);
  const user = useUser();
  const dialogBoxRef = useRef();
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationKey: ["upload"],
    mutationFn: handleSubmit,
  });
  const progressUpdater = (currentProgress) => {
    setProgress(currentProgress);
  };

  useEffect(() => {
    if (!isSuccess) return;
    dialogBoxRef.current.close();
    queryClient.invalidateQueries({ queryKey: ["my-files"] });
  }, [isSuccess]);

  async function handleSubmit(event) {
    event.preventDefault();
    const files = event.target.file.files;
    const file = files[0];

    try {
      const response = await uploadFile(file, user, progressUpdater);
      event.target.reset();
      dialogBoxRef.current.close();
      return response;
    } catch (err) {
      throw err;
    }
  }

  return (
    <dialog
      onClick={hideBox}
      id="upload-box"
      ref={dialogBoxRef}
      className="rounded border-2 shadow-md px-5 py-3 backdrop:bg-black/60"
    >
      <form onSubmit={mutate}>
        <h1 className="text-center text-4xl font-bold my-5">Upload a file</h1>
        {isError && <p className="text-center text-red-700">{error.message}</p>}
        <input
          required
          type="file"
          name="file"
          className=" my-2 text-center block w-full text-sm text-slate-500 file:mr-4 
        file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm 
        file:font-semibold file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
        />
        <button
          disabled={isPending}
          className="w-full my-2 bg-[#4F46E5] disabled:opacity-50 text-center rounded-md py-2 font-medium text-white"
        >
          {isPending ? "Uploading..." : "Upload"}
        </button>
      </form>
    </dialog>
  );
}
