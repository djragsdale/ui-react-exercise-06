import { useState, useEffect } from "react";

import type { User } from "../types/User";

export const useEditUserDialog = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUserData, setEditedUserData] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isDirty = !!selectedUser &&
                      !!editedUserData &&
                      editedUserData?.role !== selectedUser?.role;

  const show = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
    setSelectedUser(null);
  }

  const getUpdatedUser = (editedUserData: User | null) => {
        if(!editedUserData) return null;
        if(!isDirty) return null;
        return editedUserData;
  }

  const onChangeRole = (role: string) => {
        setEditedUserData(prevUser => {
            if(!prevUser) return prevUser;
            return {...prevUser, role, }
        });
  }

  useEffect(() => {
        setEditedUserData(selectedUser);
  }, [selectedUser])
  
  return {
    editUserDialogState: {
      selectedUser,
      editedUserData,
      isOpen,
    },
    editUserDialogActions: {
      close,
      show
    },
    editUserDialogHandlers: {
      getUpdatedUser,
      onChangeRole,
    }
  }
};