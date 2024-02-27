export default function SharesList({ listTitle, list }) {
  return (
    <div>
      <h1 className=" text-left text-xs font-medium text-slate-500">
        {listTitle}
      </h1>
      <div className="flex gap-1 flex-wrap">
        {("receivers" in list ? list.receivers : list).map(
          (receiver, index) => (
            <p key={index} className="border border-slate-500  px-2 text-xs">
              {receiver?.receiverName || receiver}
            </p>
          )
        )}
      </div>
    </div>
  );
}
