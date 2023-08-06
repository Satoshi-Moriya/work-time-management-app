import { useCallback, useState } from "react";
import { auth } from "../repository/repository";

export const useAuth = (): [
  number | null | undefined,
  string | null | undefined,
  {
    setUserId: React.Dispatch<React.SetStateAction<number | null | undefined>>,
    setUserEmail: React.Dispatch<React.SetStateAction<string | null | undefined>>,
    isAuthUser: () => void
  }
] => {
  const [userId, setUserId] = useState<number | null | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | null | undefined>("");

  const isAuthUser = useCallback( async () => {
    const response = await auth();
    console.log(response);
    // ToDo successというプロパティは無くしてstatus codeで分岐できるようにする（apiの作り方を変える必要がある）
    if (response.success) {
      setUserId(response.authUserId);
      setUserEmail(response.authUserEmail);
      console.log("execution isAuthUser success");
    } else {
      setUserId(null);
      console.log("execution isAuthUser false");
    }
    console.log("execution isAuthUser");
  }, []);

  return [userId, userEmail, {setUserId, setUserEmail, isAuthUser}]
}