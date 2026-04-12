import { MouseEvent } from "react";
import type { User } from "../types/User";

import { Button } from "@blueprintjs/core";

type UserRowProps = {
  onEditUser?: (user: User) => void;
  userItem: User;
};

export const UserRow = ({ userItem, onEditUser }: UserRowProps) => {
    const onEditUserRow = (event: MouseEvent<HTMLElement>) => {
        onEditUser?.(userItem);
        event.currentTarget.blur();
    }

    return <tr>
        <td>{userItem.idUser}</td>
        <td>{userItem.profile.firstName}</td>
        <td>{userItem.profile.lastName}</td>
        <td style={{ width: "140px" }}>{userItem.role}</td>
        <td>
            <Button icon="edit" aria-label="edit" intent="primary" onClick={onEditUserRow} />
        </td>
    </tr>
};