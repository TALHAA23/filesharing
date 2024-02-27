import { useQuery } from "@tanstack/react-query";
import CreateFilesTable from "../Components/CreateFilesTable";
import getUserFiles from "../utils/getMyFiles";
import { useUser } from "../Hooks/UserProvider";
import Share from "../Components/Share";
import { useState } from "react";
import LoginRequired from "../Components/LoginRequired";
import Loader from "../Components/Loader";
import NoResult from "../Components/NoResult";
import Error from "../Components/Error";
import FilesList from "../Components/FilesList";
export default function Home() {
  const [fileToShare, setFileToShare] = useState(null);
  const user = useUser();

  const { isPending, isError, error, data, isSuccess } = useQuery({
    queryKey: ["my-files"],
    queryFn: () => (user ? getUserFiles(user.uid) : null),
    enabled: !!user,
  });
  if (!user) return <LoginRequired message="Login to see your uploads" />;
  else if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data || !Object.keys(data).length)
    return <NoResult message="You have no Uploads" />;
  return (
    isSuccess && (
      <div className="narrow-scroller overflow-x-auto my-6">
        <FilesList files={data} updateFileToShare={setFileToShare} />
        <Share fileToShare={fileToShare} />
        {/* <CreateFilesTable updateFileToShare={setFileToShare} files={data} /> */}
      </div>
    )
  );
}
