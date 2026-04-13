import { useState } from "react";

import type { User } from "../types/User";

export const useEditUserDialog = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);

  const showEditUserDialog = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  }

  const closeEditUserDialog = () => {
    setIsOpen(false);
    setSelectedUser(undefined);
  }
  
  return {
    isOpenEditUserDialog: isOpen,
    closeEditUserDialog,
    showEditUserDialog,
    selectedUserEditUserDialog: selectedUser,
  }
};