import { useState, useCallback } from "react";

import type { User } from "../types/User";

export const useEditUserDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const showDialog = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  }
  
  return {
    isOpenEditUserDialog: isOpen,
    closeEditUserDialog: closeDialog,
    showEditUserDialog: showDialog,
    selectedUserEditUserDialog: selectedUser,
  }
};