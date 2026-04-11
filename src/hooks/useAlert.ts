import { useState, useCallback } from "react";

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const closeAlert = useCallback(() => {
      setIsOpen(false);
  }, []);

  const showAlert = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  }

  const showSuccess = (message = "User updated successfully!") => {
    showAlert(message);
  }

  return {
    isOpenAlert: isOpen,
    messageAlert: message,
    closeAlert,
    showAlert,
    showSuccess,
  }
};