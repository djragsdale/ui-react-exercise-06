import { Card, Button } from "@blueprintjs/core";
import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";

import type { User } from "../types/User";

import { RoleSelect } from "./RoleSelect";

import "./EditUserDialog.scss";

interface EditUserDialog {
    isOpen: boolean;
    editedUserData: User | null;
    close: () => void;
    saveUser: (editedUserData: User | null) => void;
    onChangeRole: (role: string) => void;
}

export const EditUserDialog = ({ isOpen, editedUserData, saveUser, onChangeRole, close, }: EditUserDialog) => {
    if (!isOpen || !editedUserData) return null;

    return  <Dialog
                title="Edit User"
                isOpen={isOpen}
                icon="edit"
                isCloseButtonShown={false}
            >
            <DialogBody>
            <Card className="cardUserDialog">
                <div className="rowUserDialog">
                    <span className="titleUserDialog"><strong>Id:</strong></span>
                    <span>{editedUserData.idUser}</span>
                </div>
                <div className="rowUserDialog">
                    <span className="titleUserDialog"><strong>Firstname:</strong></span>
                    <span>{editedUserData.profile.firstName}</span>
                </div>
                <div className="rowUserDialog">
                    <span className="titleUserDialog"><strong>Lastname:</strong></span>
                    <span>{editedUserData.profile.lastName}</span>
                </div>
                <div className="rowUserDialog">
                    <span className="titleUserDialog"><strong>Role:</strong></span>
                    <RoleSelect
                        role={editedUserData.role}
                        onChangeRole={onChangeRole}
                    />
                </div>
            </Card>
            </DialogBody>
            <DialogFooter
                actions={<>
                            <Button onClick={close}>Cancel</Button>
                            <Button onClick={() => saveUser(editedUserData)}>Save</Button>
                        </>}
            />
        </Dialog>
};