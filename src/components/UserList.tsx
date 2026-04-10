import { Spinner } from "@blueprintjs/core";

import type { User } from "../types/User";
import { UserListItem } from "./UserListItem";

type UserListProps = {
  isLoading?: boolean;
  onEditUser?: (user: User) => void;
  users?: User[];
};

export const UserList = ({ isLoading, onEditUser, users }: UserListProps) => {
  if (isLoading) {
    return <Spinner intent="primary" size={100} />;
  }

  return <>{users?.length ? (<table>
    <tbody>
      {users.map ((userItem, index) =>
        <UserListItem key={`user-list-item-${userItem.idUser}-${index}`} userItem={userItem} onEditUser={onEditUser} />
      )}
    </tbody>
  </table>) : null}</>;
};
