import { useState, useEffect } from "react";
import { Card, Button } from "@blueprintjs/core";

import type { User } from "../types/User";
import { type Role, roles } from "../types/Role";

import { UIDialog } from "./ui/UIDialog";
import { RoleSelect } from "./RoleSelect";

import "./EditUserDialog.scss";

interface EditUserDialog {
    onUpdateUser: (idUser: number, editedUserData: User) => void;
    isOpen: boolean;
    userData?: User;
    onClose: () => void;
}

export const EditUserDialog = ({ isOpen, userData, onUpdateUser, onClose, }: EditUserDialog) => {
    const [editedUserData, setEditedUserData] = useState<User|undefined>(userData);

    useEffect(() => {
        setEditedUserData(userData);
    }, [userData])

    const handleOnChangeRole = (role: Role) => {
        setEditedUserData(prevUser => {
            if(!prevUser) return prevUser;
            return {...prevUser, role, }
        });
    }

    const handleEditUser = () => {
        if(!editedUserData) return;
        onUpdateUser?.(editedUserData.idUser, editedUserData);
        onClose?.();
    }

    if (!editedUserData) return null;

    return <UIDialog
            title="Edit User"
            isCloseButtonShown={false}
            isOpen={isOpen}
            icon="edit"
            footerActions={(<>
                              <Button onClick={onClose}>Cancel</Button>
                              <Button onClick={handleEditUser}>Save</Button>
                            </>
                          )}
            >
            <Card className="cardUserDialog">
                <div>
                    <span className="titleUserDialog"><strong>Id:</strong></span>
                    <span>{editedUserData.idUser}</span>
                </div>
                <div>
                    <span className="titleUserDialog"><strong>Firstname:</strong></span>
                    <span>{editedUserData.profile.firstName}</span>
                </div>
                <div>
                    <span className="titleUserDialog"><strong>Lastname:</strong></span>
                    <span>{editedUserData.profile.lastName}</span>
                </div>
                <div>
                    <span className="titleUserDialog"><strong>Role:</strong></span>
                    <RoleSelect
                        role={editedUserData?.role?? roles[0]}
                        onChangeRole={handleOnChangeRole}
                    />
                </div>
            </Card>
          </UIDialog>
};