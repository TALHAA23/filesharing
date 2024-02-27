import { Link } from "react-router-dom";
import convertToKbs from "../assets/convertToKbs";

const isHomePage = () => location.pathname == "/";
export default function FilesList({ files, updateFileToShare }) {
  const data = Array.from(Object.entries(files));

  const showSharesForm = () => {
    const box = document.querySelector("#share-form");
    box.showModal();
  };

  return (
    <div className="sm:border w-[90%] max-w-[800px] mx-auto sm:p-8">
      {data.map(([title, file]) => {
        const { metadata } = file;
        return (
          <details className="group open:bg-white open:shadow-lg my-1 rounded-lg">
            <summary className="text-sm leading-6 text-slate-900 font-semibold select-none border group-open:text-lg group-open:border-none rounded p-2">
              {metadata.name}
            </summary>
            <div className="mx-3 text-sm h-[300px] sm:h-[200px] p-3 flex flex-col md:flex-row items-center gap-3">
              <div className="w-full md:h-full md:w-auto aspect-square border">
                preview
              </div>
              <div className=" border w-full md:h-full flex gap-2 flex-col md:justify-between p-3">
                <div className="sm:flex justify-around md:block">
                  {[
                    ["size", convertToKbs(metadata.size)],
                    ["created on", metadata.timeCreated],
                  ].map(([key, value]) => (
                    <p className="text-base">
                      {key}: <span className="text-xs">{value}</span>
                    </p>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-1">
                  {isHomePage() && (
                    <button
                      onClick={() => {
                        showSharesForm();
                        updateFileToShare(metadata.name);
                      }}
                      className="grow px-4 py-1 md:py-3 rounded font-medium text-white bg-[#4F46E5]"
                    >
                      Share
                    </button>
                  )}

                  <Link
                    to={file.downloadURL}
                    target="blank"
                    className="grow text-center px-4 py-1 md:py-3 rounded font-medium text-white bg-[#4F46E5]"
                  >
                    Download
                  </Link>
                </div>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
