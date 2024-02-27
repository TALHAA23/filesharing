import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import hideBox from "../assets/hideBox";
import getAllUsers from "../utils/getAllUser";
import shareFile from "../utils/shareFile";
import { useUser } from "../Hooks/UserProvider";
import { useEffect, useRef, useState } from "react";
import SharesList from "./SharesList";
import getTargetFileShares from "../utils/getTargetFileShares";

export default function Share({ fileToShare }) {
  const user = useUser();
  const queryClinet = useQueryClient();
  const shareFormRef = useRef(null);
  const intervalId = useRef(null);
  const [searchedUsers, setSearchUsers] = useState(null);
  const [userToSharewith, setUsertoSharewith] = useState([]);
  const { isPending, isError, error, data, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const shareMutation = useMutation({
    mutationKey: ["share"],
    mutationFn: handleSubmit,
  });

  const targetFileShares = useQuery({
    queryKey: [`shares-of-${fileToShare}`],
    queryFn: () => getTargetFileShares(user.uid, fileToShare),
    enabled: !!user && !!fileToShare,
  });

  useEffect(() => {
    if (!shareMutation.isSuccess) return;
    shareFormRef.current.close();
    queryClinet.invalidateQueries({
      queryKey: [`shares-of-${fileToShare}`],
    });
    setUsertoSharewith([]);
  }, [shareMutation.isSuccess]);

  function handleSearch(event) {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      const input = event.target.value;
      const filter = filterUser(data, input);
      setSearchUsers(filter);
    }, 1000);
  }

  function handleSelection(event) {
    const target = event.target;
    if (target.checked)
      setUsertoSharewith((prevUser) => [...prevUser, target.dataset.email]);
    else {
      setUsertoSharewith((prevUser) =>
        prevUser.filter((user) => user !== target.dataset.email)
      );
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const targetUserIds = [...formData.keys()];
    if (!targetUserIds.length) throw new Error("Select atleast one");
    const promises = targetUserIds.map((targetUser) =>
      shareFile(user, targetUser, fileToShare)
    );
    await Promise.all(promises);
    event.target.reset();
    return true;
  }

  return (
    <dialog
      id="share-form"
      ref={shareFormRef}
      className="narrow-scroller backdrop:bg-black/50 z-40 px-3 py-2 bg-black/90 shadow-md text-white rounded w-full max-w-[400px]  max-h-[70vh]"
      onClick={hideBox}
    >
      {isPending ? (
        "Fetching users"
      ) : (
        <form onSubmit={shareMutation.mutate}>
          <div className=" sticky top-0 bg-black text-center z-20 my-2 p-1 space-y-2">
            <h1 className="w-full font-semibold text-4xl">Share</h1>
            <p className="text-xs">{fileToShare}</p>
            {targetFileShares.isPending ? (
              <p className="text-xs text-slate-500">Loading Receivers</p>
            ) : (
              targetFileShares.data && (
                <SharesList
                  listTitle="Already shared with"
                  list={targetFileShares.data}
                />
              )
            )}
            {userToSharewith.length > 0 && (
              <SharesList listTitle="Now sharing with" list={userToSharewith} />
            )}
            <input
              type="search"
              placeholder="search user"
              className=" bg-slate-900 rounded-full px-2 py-1 text-sm"
              onChange={handleSearch}
            />
            {shareMutation.isError && (
              <p className="text-center text-red-800">
                {shareMutation.error.message}
              </p>
            )}
          </div>

          <div className="narrow-scroller flex flex-col overflow-y-auto">
            {data.length &&
              (searchedUsers ? searchedUsers : data).map(
                ({ email, userId }) => {
                  const emailHasThisFile = targetFileShares?.data?.receivers
                    ?.map((e) => e.receiverName)
                    ?.includes(email);
                  if (userId == user.uid || emailHasThisFile) return;
                  const isUserInShared = userToSharewith.includes(email);
                  return (
                    <label
                      key={userId}
                      className="relative text-lg flex justify-between items-center"
                    >
                      <span>{email}</span>
                      <img
                        src={
                          isUserInShared
                            ? "/minus-solid.svg"
                            : "/plus-solid.svg"
                        }
                        alt=""
                        className={`h-5 aspect-square rounded-full p-1
                         ${isUserInShared ? "bg-red-400" : "bg-green-400"}
                         `}
                      />
                      <input
                        hidden
                        data-email={email}
                        onChange={handleSelection}
                        name={userId}
                        type="checkbox"
                        className=" absolute right-2 top-1/2  -translate-y-1/2"
                      />
                    </label>
                  );
                }
              )}
          </div>
          <button
            disabled={shareMutation.isPending}
            className=" sticky w-full bottom-0 mt-3 px-4 py-2 disabled:opacity-50 rounded font-medium text-white bg-[#4F46E5]"
          >
            {shareMutation.isPending ? "Sharing" : "Share"}
          </button>
        </form>
      )}
    </dialog>
  );
}

const filterUser = (list, query) => {
  const regex = new RegExp(`^${query}`, "i");
  return list.filter(({ email }) => regex.test(email));
};
