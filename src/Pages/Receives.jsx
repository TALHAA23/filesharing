import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CreateFilesTable from "../Components/CreateFilesTable";
import { useUser } from "../Hooks/UserProvider";
import getReceivedFiles from "../utils/getReceivedFiles";
import LoginRequired from "../Components/LoginRequired";
import Loader from "../Components/Loader";
import NoResult from "../Components/NoResult";
import Error from "../Components/Error";
import FilesList from "../Components/FilesList";

export default function Receives() {
  const user = useUser();
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (user) {
      let unsubscribe;
      try {
        unsubscribe = getReceivedFiles(user.uid, setFiles);
      } catch (err) {
        setError(err);
      }

      return () => unsubscribe();
    }
  }, [user]);
  if (!user) return <LoginRequired message="Login to see what your receive" />;
  else if (files == null) return <Loader />;
  else if (error) return <Error error={error} />;
  else if (!files || !Object.keys(files).length)
    return <NoResult message="You have receive nothing" />;
  return (
    <div className="narrow-scroller overflow-x-auto">
      <FilesList files={files} />
      {/* <CreateFilesTable files={files} /> */}
    </div>
  );
}
