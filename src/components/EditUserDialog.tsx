import { useState, useEffect } from "react";
import { Card, Button } from "@blueprintjs/core";
import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";

import type { User } from "../types/User";

import { RoleSelect } from "./RoleSelect";

import "./EditUserDialog.scss";

interface EditUserDialog {
    isOpen: boolean;
    userData?: User;
    close: () => void;
    updateUser: (idUser: number, editedUserData: User) => void;
}

export const EditUserDialog = ({ isOpen, userData, updateUser, close, }: EditUserDialog) => {
    const [editedUserData, setEditedUserData] = useState<User|undefined>(userData);

    useEffect(() => {
        setEditedUserData(userData);
    }, [userData])

    const handleOnChangeRole = (role: string) => {
        setEditedUserData(prevUser => {
            if(!prevUser) return prevUser;
            return {...prevUser, role, }
        });
    }

    const handleEditUser = () => {
        if(!editedUserData) return;
        updateUser(editedUserData.idUser, editedUserData);
        close();
    }

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
                        onChangeRole={handleOnChangeRole}
                    />
                </div>
            </Card>
            </DialogBody>
            <DialogFooter
                actions={<>
                            <Button onClick={close}>Cancel</Button>
                            <Button onClick={handleEditUser}>Save</Button>
                        </>}
            />
        </Dialog>
};