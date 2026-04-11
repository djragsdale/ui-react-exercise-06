import type { User } from "../types/User";

import { Button } from "@blueprintjs/core";

type UserListItemProps = {
  onEditUser?: (user: User) => void;
  userItem: User;
};

export const UserListItem = ({ userItem, onEditUser }: UserListItemProps) => {
    const fullName = `${userItem.profile.firstName} ${userItem.profile.lastName}`;
    const text = `${userItem.idUser} - ${fullName} - ${userItem.role} `;
    return <tr>
        <td>{text}</td>
        <td>
            <Button icon="edit" aria-label="edit" intent="primary" onClick={() => onEditUser?.(userItem)} />
        </td>
    </tr>
};