import { Spinner } from "@blueprintjs/core";

import type { User } from "../types/User";
import { UserRow } from "./UserRow";

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

  return <table style={{ width: "100%", tableLayout: "fixed" }}>
    <tbody>
      {users?.map ((userItem, index) =>
        <UserRow key={`user-list-item-${userItem.idUser}-${index}`} userItem={userItem} onEditUser={onEditUser} />
      )}
    </tbody>
  </table>;
};
