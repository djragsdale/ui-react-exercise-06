import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import { Card, Classes, Alert } from "@blueprintjs/core";
import { UserList } from "./components/UserList";
import { EditUserDialog } from "./components/EditUserDialog";

import { useUsers } from "./hooks/useUsers";
import { useAlert } from "./hooks/useAlert";
import { useEditUserDialog } from "./hooks/useEditUserDialog";

import type { User } from "./types/User";

const App = () => {
  const { data, isLoading, updateUser } = useUsers();
  const { messageAlert, isOpenAlert, showSuccess, closeAlert } = useAlert();
  const {
    isOpenEditUserDialog,
    selectedUserEditUserDialog,
    showEditUserDialog,
    closeEditUserDialog,
  } = useEditUserDialog();

  const handleOnEditUser = (user: User | null) => {
    if(!user) return;
    updateUser(user.idUser, user);
    closeEditUserDialog();
    showSuccess();
  }

  return (
    <div className={`App ${Classes.DARK}`}>
      <h1>UI Screening 01</h1>
      <Card>
        <UserList isLoading={isLoading} users={data} onEditUser={showEditUserDialog} />
      </Card>
      <EditUserDialog
        onEditUser={() => handleOnEditUser(selectedUserEditUserDialog)}
        onClose={closeEditUserDialog}
        isOpen={isOpenEditUserDialog}
        messageText={"example text"}
      />
      <Alert
        confirmButtonText="Ok"
        intent="success"
        isOpen={isOpenAlert}
        loading={isLoading}
        onClose={closeAlert}
      >
        <p>{messageAlert}</p>
      </Alert>
    </div>
  );
};

export default App;
