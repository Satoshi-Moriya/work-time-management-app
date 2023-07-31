import { createContext, useEffect } from "react"
import { useAuth } from "../hooks/useAuth";

type AuthProviderProps = {
  children: React.ReactElement
}

export const AuthContext = createContext<[number | null | undefined, React.Dispatch<React.SetStateAction<number | null | undefined>>]>([null, () => {} ]);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [ userId, {setUserId, isAuthUser} ] = useAuth();

  useEffect(() => {
    isAuthUser();
  }, [isAuthUser])

  return <AuthContext.Provider value={[ userId, setUserId ]} >{children}</AuthContext.Provider>
}

export default AuthProvider;