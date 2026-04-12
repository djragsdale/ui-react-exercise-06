import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import { Card, Classes } from "@blueprintjs/core";
import { UserList } from "./components/UserList";
import { EditUserDialog } from "./components/EditUserDialog";

import { useUsers } from "./hooks/useUsers";
import { useEditUserDialog } from "./hooks/useEditUserDialog";

const App = () => {
  const { data, isLoading, updateUser } = useUsers();
  const {
    isOpenEditUserDialog,
    selectedUserEditUserDialog,
    showEditUserDialog,
    closeEditUserDialog,
  } = useEditUserDialog();

  return (
    <div className={`App ${Classes.DARK}`}>
      <h1>UI Screening 01</h1>
      <Card style={{ width: "50%" }}>
        <UserList isLoading={isLoading} users={data} onEditUser={showEditUserDialog} />
      </Card>
      <EditUserDialog
        isOpen={isOpenEditUserDialog}
        userData={selectedUserEditUserDialog}
        onEditUser={updateUser}
        onClose={closeEditUserDialog}
      />
    </div>
  );
};

export default App;
