import { useState, useCallback } from "react";

export const useUserDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = useCallback(() => {
      setIsOpen(false);
  }, []);

  const showDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpenDialog: isOpen,
    closeDialog,
    showDialog,
  }
};