import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Role } from "../types/Role";

import { EditUserDialog } from "./EditUserDialog";
import type { User } from "../types/User";

const NEW_ROLE: Role = "Administrator";
const OLD_ROLE: Role = "Engineer";
const createTestUser = () => ({
    idUser: 1,
    profile: {
      firstName: "ABC",
      lastName: "DEF",
    },
    role: OLD_ROLE,
});
const renderEditUserDialog = (props = {}) => {
  const userData: User = createTestUser();
  const handlers = {
      close: jest.fn(),
      updateUser: jest.fn()
  };
  const testingUtils = render(<EditUserDialog
                                isOpen={true}
                                userData={userData}
                                {...props}
                                {...handlers}
                              />);
  return {
    user: userEvent.setup(),
    userData,
    handlers,
    ...testingUtils,
  };
};

describe("EditUserDialog", () => {
  it("If the user chooses to cancel the role change, the UserList does not update", async () => {
    const { user, getByRole, handlers } = renderEditUserDialog();
    await user.click(getByRole("button", { name: /^cancel$/i }));
    expect(handlers.updateUser).not.toHaveBeenCalled();
    expect(handlers.close).toHaveBeenCalledTimes(1);
  });

  it("The UserList does not update until the user clicks a Save button in the dialog", async () => {
    const { user, userData, getByRole, handlers } = renderEditUserDialog();
    const expectedUser = { ...userData, role: NEW_ROLE };
    const select = getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(userData.role);
    await user.selectOptions(select, NEW_ROLE);
    expect(select).toHaveValue(NEW_ROLE);
    expect(handlers.updateUser).not.toHaveBeenCalled();
    await user.click(getByRole("button", { name: /^save$/i }));
    expect(handlers.updateUser).toHaveBeenCalled();
    expect(handlers.updateUser).toHaveBeenCalledWith(userData.idUser, expectedUser);
  });

  it("The dialog closes when the user saves the role change", async () => {
    const { user, userData, getByRole, handlers } = renderEditUserDialog();
    const select = getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(userData.role);
    await user.selectOptions(select, NEW_ROLE);
    expect(select).toHaveValue(NEW_ROLE);
    expect(handlers.updateUser).not.toHaveBeenCalled();
    await user.click(getByRole("button", { name: /^save$/i }));
    expect(handlers.updateUser).toHaveBeenCalled();
    expect(handlers.close).toHaveBeenCalled();
  });

  it("The dialog displays all available user data, even values not being changed", () => {
    const { userData, getByText } = renderEditUserDialog();
    expect(getByText(userData.idUser)).toBeInTheDocument();
    expect(getByText(userData.profile.firstName)).toBeInTheDocument();
    expect(getByText(userData.profile.lastName)).toBeInTheDocument();
    expect(getByText(userData.role)).toBeInTheDocument();
    });
});
