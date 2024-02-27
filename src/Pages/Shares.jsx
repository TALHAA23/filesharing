import { useQuery } from "@tanstack/react-query";
import { useUser } from "../Hooks/UserProvider";
import LoginRequired from "../Components/LoginRequired";
import Loader from "../Components/Loader";
import getAllShares from "../utils/getAllShares";
import SharesTable from "../Components/SharesTables";
import NoResult from "../Components/NoResult";
import Error from "../Components/Error";
export default function Shares() {
  const user = useUser();
  const { isPending, isError, error, data, isSuccess } = useQuery({
    queryKey: ["my-shares"],
    queryFn: () => getAllShares(user.uid),
    enabled: !!user,
  });

  if (!user) return <LoginRequired message="Login to see your uploads" />;
  else if (isPending) return <Loader />;
  else if (isError) return <Error error={error} />;
  else if (!data || !Object.keys(data).length)
    return <NoResult message="You have share nothing" />;
  return <SharesTable shares={data} />;
}
