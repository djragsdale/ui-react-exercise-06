import { Dialog, DialogBody, DialogFooter, type DialogProps } from "@blueprintjs/core";
import React from "react";

interface UIDialogWithDialogProps extends Omit<DialogProps, "isOpen"> {
    isOpen?: boolean;
    footerActions?: React.ReactNode;
}

export const UIDialog = ({
    isOpen,
    title,
    children,
    footerActions,
    onClose,
    isCloseButtonShown,
    icon,
}:
    UIDialogWithDialogProps) => {
    return <Dialog
                title={title}
                icon={icon}
                isOpen={isOpen}
                onClose={onClose}
                isCloseButtonShown={isCloseButtonShown}
            >
                <DialogBody>
                    {children}
                </DialogBody>
                {<DialogFooter actions={footerActions} />}
            </Dialog>
};