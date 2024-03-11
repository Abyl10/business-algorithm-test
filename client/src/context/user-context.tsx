import React, { createContext, useContext, useEffect } from "react";
import { IUser } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../requests/profile";
import { getAccessToken } from "../lib/token";

interface IUserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

interface IUserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
});

export const useUserContext = (): IUserContextType => useContext(UserContext);

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<IUser | null>(null);

  const token = getAccessToken();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
