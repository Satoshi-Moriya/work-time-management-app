import Toast from "../../Toast/components/Toast";
import { useRecordItem } from "../hooks/useRecordItem";

const RecordItem = () => {
  const [
    recordItemText,
    recordItems,
    toast,
    error,
    {
      recordItemTextChangeHandler,
      recordItemAddHandler,
      recordItemDeleteHandler,
      setToast
    }
  ] = useRecordItem();

  return (
    <>
      <main className="
          grow flex flex-col justify-center h-screen mt-52
          md:ml-48 md:mt-0
        "
      >
        <div className="py-10 px-7 h-full">
          <div className="h-full">
            <h2 className="text-2xl md:text-3xl font-bold">記録項目</h2>
            {
              !error &&
              <div className="mt-10 md:mt-14 md:ml-4 max-w-[500px]">
                {recordItems.length !== 0 &&
                  <ul className="mb-10">
                    {
                      recordItems.map((recordItem, index) => {
                        return (
                          <li key={index} className="flex items-center border-t [&:last-child]:border-b border-gray-400">
                            <div className="font-semibold w-1/2 pl-2 md:pl-8 pr-2 py-2 border-r border-gray-400 leading-7">{recordItem.recordItemName}</div>
                            <div className="w-1/2 text-center px-2 py-2">
                              <button onClick={() => recordItemDeleteHandler(recordItem.recordItemId, recordItem.recordItemName)} className="text-sm bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-2 py-1">削除</button>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                }
                <div className="flex items-center justify-center md:justify-start">
                  <input placeholder="項目名を入力" value={recordItemText} onChange={recordItemTextChangeHandler} className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block rounded-md sm:text-sm" />
                  <button onClick={recordItemAddHandler} className="text-sm bg-gray-500 hover:opacity-50 focus:opacity-50 rounded-lg text-white  ml-4 px-3 py-2">
                    新規
                  </button>
                </div>
              </div>
            }
            {error && <p className="flex justify-center items-center h-full">{error}</p>}
          </div>
        </div>
      </main>
      {
        toast.isSuccess != null && (
          <Toast toast={toast} setToast={setToast} />
        )
      }
    </>
  );
};

export default RecordItem;
