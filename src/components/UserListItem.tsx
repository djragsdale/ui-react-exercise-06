import type { User } from "../types/User";
import "./UserListItem.scss";

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
            <button className="edit-button-class" onClick={() => onEditUser?.(userItem)}>Edit</button>
        </td>
    </tr>
};