import { useState } from "react";

import type { User } from "../types/User";
import { useUserDialog } from "./useUserDialog";

export const useEditUserDialog = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const { isOpenDialog, showDialog, closeDialog } = useUserDialog();

  const showEditUserDialog = (user: User) => {
    setSelectedUser(user);
    showDialog();
  }
  
  return {
    isOpenEditUserDialog: isOpenDialog,
    closeEditUserDialog: closeDialog,
    showEditUserDialog,
    selectedUserEditUserDialog: selectedUser,
  }
};