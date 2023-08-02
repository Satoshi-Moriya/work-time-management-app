import { useCallback, useState } from "react";
import { auth } from "../repository/repository";

export const useAuth = (): [
  number | null | undefined,
  string | null | undefined,
  {
    setUserId: React.Dispatch<React.SetStateAction<number | null | undefined>>,
    isAuthUser: () => void
  }
] => {
  const [userId, setUserId] = useState<number | null | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | null | undefined>("");

  const isAuthUser = useCallback( async () => {
    const response = await auth();
    if (response.success) {
      setUserId(response.authUserData?.userId);
      setUserEmail(response.authUserData?.userEmail);
    } else {
      setUserId(null);
    }
  }, []);

  return [userId, userEmail, {setUserId, isAuthUser}]
}