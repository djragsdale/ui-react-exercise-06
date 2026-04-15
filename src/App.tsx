import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import type { User } from "./types/User";

import { Card, Classes } from "@blueprintjs/core";
import { UserList } from "./components/UserList";
import { EditUserDialog } from "./components/EditUserDialog";

import { useUsers } from "./hooks/useUsers";
import { useEditUserDialog } from "./hooks/useEditUserDialog";

const App = () => {
  const { data, isLoading, updateUser } = useUsers();
  const {
    editUserDialogState,
    editUserDialogActions,
    editUserDialogHandlers
  } = useEditUserDialog();

  return (
    <div className={`App ${Classes.DARK}`}>
      <h1>UI Screening 01</h1>
      <Card>
        <UserList
          isLoading={isLoading}
          users={data}
          onEditUser={editUserDialogActions.show}
        />
      </Card>
      <EditUserDialog
        isOpen={editUserDialogState.isOpen}
        editedUserData={editUserDialogState.editedUserData}
        saveUser={(editedUserData: User | null) => {
          const userUpdated = editUserDialogHandlers.getUpdatedUser(editedUserData);
          if(!!userUpdated) {
            updateUser(userUpdated.idUser, userUpdated);
          }
          editUserDialogActions.close();
        }}
        onChangeRole={editUserDialogHandlers.onChangeRole}
        close={editUserDialogActions.close}
      />
    </div>
  );
};

export default App;
