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

  if(!users?.length) {
    return <div>There is no items</div>;
  }

  return <table>
    <tbody>
      {users.map ((userItem, index) =>
        <UserListItem key={`user-list-item-${userItem.idUser}-${index}`} userItem={userItem} onEditUser={onEditUser} />
      )}
    </tbody>
  </table>;
};
