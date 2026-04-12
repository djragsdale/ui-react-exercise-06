import { useState, useEffect } from "react";

import type { User } from "../types/User";

import { UIDialog } from "./ui/UIDialog";
import { Card, Button } from "@blueprintjs/core";

import { RoleSelect } from "./RoleSelect";

interface EditUserDialog {
    onEditUser?: (idUser: number, editedUserData: User) => void;
    isOpen?: boolean;
    userData?: User;
    onClose?: () => void;
}

export const EditUserDialog = ({ isOpen, userData, onEditUser, onClose, }: EditUserDialog) => {
    const [editedUserData, setEditedUserData] = useState<User | undefined>(userData);

    useEffect(() => {
        setEditedUserData(userData);
    }, [userData])

    const handleOnChangeRole = (role: string) => {
        setEditedUserData(prevUser => {
            if(!prevUser) return prevUser;
            
            return {...prevUser, role, }
        });
    }

    const handleEditUser = (user?: User) => {
        if(!user) return;
        onEditUser?.(user.idUser, user);
        onClose?.();
    }

    return <UIDialog
            title="Edit User"
            isCloseButtonShown={false}
            isOpen={isOpen}
            icon="edit"
            footerActions={(<>
                              <Button onClick={onClose}>Cancel</Button>
                              <Button onClick={() => handleEditUser?.(editedUserData)}>Save</Button>
                            </>
                          )}
            >
            <Card style={{ width: "100%" }}>
                <table style={{ width: "100%", tableLayout: "fixed" }}>
                    <tbody>
                    <tr>
                        <td>Id: </td>
                        <td>{userData?.idUser}</td>
                    </tr>
                    <tr>
                        <td>FirstName: </td>
                        <td>{userData?.profile.firstName}</td>
                    </tr>
                    <tr>
                        <td>LastName: </td>
                        <td>{userData?.profile.lastName}</td>
                    </tr>
                    <tr>
                        <td>Role: </td>
                        <td>
                            <RoleSelect
                                role={userData?.role}
                                onChangeRole={handleOnChangeRole}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Card>
          </UIDialog>
};