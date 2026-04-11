import { Button, Dialog, DialogBody, DialogFooter, type DialogProps } from "@blueprintjs/core";

interface EditUserDialogWithDialogProps extends Omit<DialogProps, "isOpen"> {
    messageText: string;
    onEditUser?: () => void;
    isOpen: boolean;
}

export const EditUserDialog = ({ isOpen, messageText, onEditUser, onClose }: EditUserDialogWithDialogProps) => {
    const footerActions = (
        <>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onEditUser}>Save</Button>
        </>
    );

    return <Dialog icon="edit" isOpen={isOpen} onClose={onClose}>
                <DialogBody>
                    <p>
                        {messageText}
                    </p>
                </DialogBody>
                <DialogFooter actions={footerActions} />
            </Dialog>
};