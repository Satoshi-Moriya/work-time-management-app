import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../Auth/components/AuthProvider";
import { RecordItemType } from "../../../types";
import { fetchRecordItems } from "../repositories/fetchRecordItems";
import { postRecordItem } from "../repositories/postRecordItem";
import { deleteRecordItem } from "../repositories/deleteRecordItem";

export const useRecordItem = (): [
  string,
  {recordItemId: number, recordItemName: string}[],
  {message: string | null, isSuccess: boolean | null},
  {
    recordItemTextChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    recordItemAddHandler: () => void,
    recordItemDeleteHandler: (recordItemId: number, recordItemText: string) => void,
    setToast: React.Dispatch<React.SetStateAction<{message: string | null, isSuccess: boolean | null}>>
  }
] => {
  const [recordItemText, setRecordItemText] = useState("");
  const [recordItems, setRecordItems] = useState<{recordItemId: number, recordItemName: string}[]>([]);
  const [userId] = useContext(AuthContext);
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null}>({message: null, isSuccess: null});

  useEffect(() => {
    (async() => {
      try {
        const recordItemsResponse = await fetchRecordItems(userId);
        const recordItems: RecordItemType[] = recordItemsResponse.data;
        const recordItemsWithoutUserId = recordItems.map(({recordItemId, recordItemName}) => ({recordItemId, recordItemName}));
        setRecordItems(recordItemsWithoutUserId);
      } catch(error) {
        setToast({message: "予期せぬエラーが発生し、記録項目を取得できませんでした。", isSuccess: false});
      }
    })();
  }, []);

  const recordItemTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setRecordItemText(event.target.value);

  const recordItemAddHandler = async() => {
    if (recordItemText === "") return;
    try {
      await postRecordItem(userId, recordItemText);
      setToast({message: "記録項目が登録されました。", isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが発生し、記録項目が登録できませんでした。", isSuccess: false});
    } finally {
      setRecordItemText("");
      const recordItemsResponse = await fetchRecordItems(userId);
      const recordItems: RecordItemType[] = recordItemsResponse.data;
      const recordItemsWithoutUserId = recordItems.map(({recordItemId, recordItemName}) => ({recordItemId, recordItemName}));
      setRecordItems(recordItemsWithoutUserId);
    }
  }

  const recordItemDeleteHandler = async(recordItemId: number, recordItemText: string) => {
    const confirm = window.confirm(`本当に「${recordItemText}」を削除してもよろしいですか？削除すると「${recordItemText}」の記録が全て消えます。`);
    if (confirm) {
      try {
        await deleteRecordItem(recordItemId);
        setToast({message: "記録項目が削除されました。", isSuccess: true});
      } catch(error) {
        setToast({message: "予期せぬエラーが発生し、記録項目が削除できませんでした。", isSuccess: false});
      } finally {
        const recordItemsResponse = await fetchRecordItems(userId);
        const recordItems: RecordItemType[] = recordItemsResponse.data;
        const recordItemsWithoutUserId = recordItems.map(({recordItemId, recordItemName}) => ({recordItemId, recordItemName}));
        setRecordItems(recordItemsWithoutUserId);
      }
    }
  }

  return [recordItemText, recordItems, toast, {recordItemTextChangeHandler, recordItemAddHandler, recordItemDeleteHandler, setToast}];
};