import { useCallback, useState } from "react";
import { auth } from "../repositories/auth";

export const useAuth = (): [
  number | null | undefined,
  {
    setUserId: React.Dispatch<React.SetStateAction<number | null | undefined>>,
    isAuthUser: () => void
  }
] => {
  const [userId, setUserId] = useState<number | null | undefined>(undefined);

  const isAuthUser = useCallback( async() => {
    try {
      const response = await auth();
      // ToDo successというプロパティは無くしてstatus codeで分岐できるようにする（apiの作り方を変える必要がある）
      if (response.success) {
        setUserId(response.authUserId);
      } else {
        setUserId(null);
      }
    } catch(error) {
      setUserId(null);
    }
  }, []);

  return [userId, {setUserId, isAuthUser}]
}