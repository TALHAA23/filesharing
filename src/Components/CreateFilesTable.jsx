import { Link } from "react-router-dom";
import mimeToExtension from "../assets/mimeToExtenstion";
import convertToKbs from "../assets/convertToKbs";
const tableColHeading = [
  "SeqNo.",
  "filename",
  "type",
  "size (in KBs)",
  "preview",
];
const isHomePage = () => location.pathname == "/";
export default function CreateFilesTable({ files, updateFileToShare }) {
  const data = Array.from(Object.entries(files));

  const showSharesForm = () => {
    const box = document.querySelector("#share-form");
    box.showModal();
  };

  return (
    <table className="w-[95%] border m-2 max-w-[1000px] mx-auto overflow-x-scroll">
      <thead>
        <tr>
          {isHomePage() && <th>Share</th>}
          {tableColHeading.map((heading, index) => (
            <th key={index} className="text-center">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((file, index) => {
          const metaData = file[1].metadata;
          return (
            <tr key={index} className="h-8 hover:bg-black/10">
              {isHomePage() && (
                <td className="w-[30px]">
                  <button
                    className="mx-2 rounded-full bg-blue-300 px-2 text-xs hover:bg-blue-400 active:scale-90"
                    onClick={() => {
                      showSharesForm();
                      updateFileToShare(metaData.name);
                    }}
                  >
                    share
                  </button>
                </td>
              )}
              {[
                index + 1,
                metaData.name,
                mimeToExtension[metaData.contentType],
                convertToKbs(metaData.size),
                <Link
                  to={file[1].downloadURL}
                  target="blank"
                  className=" hover:text-blue-600"
                >
                  url
                </Link>,
              ].map((cell) => (
                <td key={cell} className="text-center first:font-semibold">
                  {cell}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
