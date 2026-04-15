import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { EditUserDialog } from "./EditUserDialog";
import type { User } from "../types/User";

const NEW_ROLE = "Administrator";
const OLD_ROLE = "Engineer";
const createTestUser = () => ({
    idUser: 1,
    profile: {
      firstName: "ABC",
      lastName: "DEF",
    },
    role: OLD_ROLE,
});

const renderEditUserDialog = (props : { editedUser?: User | null } = {}) => {
  const userData: User = props.editedUser ?? createTestUser();
  const editUserDialogActions = {
    close: jest.fn(),
    show: jest.fn()
  };
  const editUserDialogHandlers = {
    onChangeRole: jest.fn(),
    saveUser: jest.fn(() => {
      editUserDialogActions.close();
    })
  };
  const Container = () => {
    const [editedUserData, setEditedUserData] = useState<User | null>(userData);
    return (<EditUserDialog
              isOpen={true}
              editedUserData={editedUserData}
              {...props}
              saveUser={editUserDialogHandlers.saveUser}
              onChangeRole={(role:string) => {
                editUserDialogHandlers.onChangeRole(role);
                setEditedUserData((prevUser: User | null) => {
                  if(!prevUser) return prevUser;
                  return {...prevUser, role};
                });
              }}
              close={editUserDialogActions.close}
          />);
  }
  const testingUtils = render(<Container />);
  return {
    user: userEvent.setup(),
    editUserDialogActions,
    editUserDialogHandlers,
    ...testingUtils,
  };
};

describe("EditUserDialog", () => {
  it("If the user chooses to cancel the role change, the UserList does not update", async () => {
    const {
      user,
      getByRole,
      editUserDialogActions: { close },
      editUserDialogHandlers: { saveUser }
    } = renderEditUserDialog();
    await user.click(getByRole("button", { name: /^cancel$/i }));
    expect(saveUser).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it("The UserList does not update until the user clicks a Save button in the dialog", async () => {
    const userData = createTestUser();
    const {
      user,
      getByRole,
      editUserDialogHandlers: { onChangeRole, saveUser },
    } = renderEditUserDialog({ editedUser: userData });
    const expectedUser = { ...userData, role: NEW_ROLE };
    const select = getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(OLD_ROLE);
    await user.selectOptions(select, NEW_ROLE);
    expect(onChangeRole).toHaveBeenCalledWith(NEW_ROLE);
    expect(select).toHaveValue(NEW_ROLE);
    expect(saveUser).not.toHaveBeenCalled();
    await user.click(getByRole("button", { name: /^save$/i }));
    expect(saveUser).toHaveBeenCalled();
    expect(saveUser).toHaveBeenCalledWith(expectedUser);
  });

  it("The dialog closes when the user saves the role change", async () => {
    const {
      user,
      getByRole,
      editUserDialogActions,
      editUserDialogHandlers: { onChangeRole, saveUser }
    } = renderEditUserDialog();
    const select = getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(OLD_ROLE);
    await user.selectOptions(select, NEW_ROLE);
    expect(onChangeRole).toHaveBeenCalled();
    expect(onChangeRole).toHaveBeenCalledWith(NEW_ROLE);
    expect(saveUser).not.toHaveBeenCalled();
    await user.click(getByRole("button", { name: /^save$/i }));
    expect(saveUser).toHaveBeenCalled();
    expect(editUserDialogActions.close).toHaveBeenCalled();
  });

  it("The dialog displays all available user data, even values not being changed", () => {
    const userData = createTestUser();
    const { getByText } = renderEditUserDialog({ editedUser: userData });
    expect(getByText(userData?.idUser)).toBeInTheDocument();
    expect(getByText(userData?.profile.firstName)).toBeInTheDocument();
    expect(getByText(userData?.profile.lastName)).toBeInTheDocument();
    expect(getByText(userData?.role)).toBeInTheDocument();
    });
});
