import { Spinner, HTMLTable } from "@blueprintjs/core";

import type { User } from "../types/User";
import { UserRow } from "./UserRow";

import "./UserList.scss";

type UserListProps = {
  isLoading?: boolean;
  onEditUser?: (user: User) => void;
  users?: User[];
};

export const UserList = ({ isLoading, onEditUser, users }: UserListProps) => {
  if (isLoading) {
    return <Spinner intent="primary" size={100} />;
  }

  return <HTMLTable>
    <thead>
      <tr>
        <th>Id</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th className="roleColumnUserList">Role</th>
        {onEditUser && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {users?.map ((userItem) =>
        <UserRow
          key={`user-row-${userItem.idUser}`}
          user={userItem}
          onEditUser={onEditUser}
        />
      )}
    </tbody>
  </HTMLTable>;
};
