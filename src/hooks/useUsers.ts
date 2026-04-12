import { useRef, useState } from "react";

import type { User } from "../types/User";
import { roles } from "../types/Role";

import { useDelayedEffect } from "./useDelayedEffect";

const users: User[] = [
  {
    idUser: 1001,
    profile: {
      firstName: "Adam",
      lastName: "Alpaca",
    },
    role: roles[0],
  },
  {
    idUser: 1002,
    profile: {
      firstName: "Bradly",
      lastName: "Buffalo",
    },
    role: roles[1],
  },
  {
    idUser: 1003,
    profile: {
      firstName: "Charles",
      lastName: "Chinchilla",
    },
    role: roles[2],
  },
];

export const TIME_DELAY = 2_000;

export const useUsers = () => {
  const [data, setData] = useState<User[] | undefined>();
  const isDelayedUpdateCancelled = useRef(false);

  useDelayedEffect(
    TIME_DELAY,
    () => {
      if (isDelayedUpdateCancelled.current) return;
      setData(users);
    },
    [setData]
  );

  const handleUpdateUser = (idUser: number, user: User) => {
    isDelayedUpdateCancelled.current = true;
    
    setData((prev: User[] | undefined) =>
      prev?.map((prevUser:User) =>
        prevUser?.idUser === idUser ? user : prevUser
      )
    );
  };

  if (!data) {
    return {
      isLoading: true,
      updateUser: handleUpdateUser,
    };
  }

  return {
    data,
    isLoading: false,
    updateUser: handleUpdateUser,
  };
};
