import type { User } from "../types/User";

import { Button } from "@blueprintjs/core";

type UserRowProps = {
  onEditUser?: (user: User) => void;
  user: User;
};

export const UserRow = ({ user, onEditUser }: UserRowProps) => {
    return <tr>
        <td>{user.idUser}</td>
        <td>{user.profile.firstName}</td>
        <td>{user.profile.lastName}</td>
        <td>{user.role}</td>
        {onEditUser && <td>
            <Button
                icon="edit"
                aria-label="edit"
                intent="primary"
                onClick={() => onEditUser(user)}
            />
        </td>}
    </tr>
};