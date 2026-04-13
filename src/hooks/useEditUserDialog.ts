import { useState } from "react";

import type { User } from "../types/User";
import { useUIDialog } from "./useUIDialog";

export const useEditUserDialog = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const { isOpenDialog, showDialog, closeDialog } = useUIDialog();

  const showEditUserDialog = (user: User) => {
    setSelectedUser(user);
    showDialog();
  }

  const closeEditUserDialog = () => {
    closeDialog();
    setSelectedUser(undefined);
  }
  
  return {
    isOpenEditUserDialog: isOpenDialog,
    closeEditUserDialog,
    showEditUserDialog,
    selectedUserEditUserDialog: selectedUser,
  }
};