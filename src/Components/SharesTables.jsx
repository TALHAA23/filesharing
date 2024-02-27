export default function SharesTable({ shares }) {
  const sharesToArray = Array.from(Object.entries(shares));
  return (
    <table className="w-[95%]  table-fixed border m-2 max-w-[1000px] mx-auto overflow-x-scroll">
      <thead>
        <tr className="text-center font-semibold text-lg">
          <td>File Name</td>
          <td>Permissions</td>
        </tr>
      </thead>
      <tbody className="text-center">
        {sharesToArray.map(([fileName, receivers]) => (
          <tr className="hover:bg-black/10">
            <td className="w-[20%]">{fileName}</td>
            <td className="flex flex-wrap gap-1 justify-center">
              {receivers.receivers.map((receiver) => (
                <p
                  key={receiver.receiverName}
                  className=" border border-black/20 rounded px-3 text-sm hover:font-semibold"
                >
                  {receiver.receiverName}
                </p>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
