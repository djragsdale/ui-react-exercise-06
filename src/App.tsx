import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import { Card, Classes, Alert } from "@blueprintjs/core";
import { UserList } from "./components/UserList";

import { useUsers } from "./hooks/useUsers";
import { useAlert } from "./hooks/useAlert";

import type { User } from "./types/User";

const App = () => {
  const { data, isLoading, updateUser } = useUsers();
  const { messageAlert, isOpenAlert, showSuccess, closeAlert } = useAlert();

  const handleOnEditUser = (idUser: number, user: User) => {
    updateUser(idUser, user);
    showSuccess();
  }

  return (
    <div className={`App ${Classes.DARK}`}>
      <h1>UI Screening 01</h1>
      <Card>
        <UserList isLoading={isLoading} users={data} onEditUser={(userItem) => handleOnEditUser(userItem.idUser, userItem)} />
      </Card>
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
