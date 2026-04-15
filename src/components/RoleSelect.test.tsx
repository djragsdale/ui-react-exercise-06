import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RoleSelect } from "./RoleSelect";

const NEW_ROLE = "Administrator";

const renderRoleSelect = (props = {}) => {
  const selectedRole = "Engineer";
  const handlers = {
      onChangeRole: jest.fn(),
  };
  const testingUtils = render(<RoleSelect
                                role={selectedRole}
                                {...props}
                                {...handlers}
                              />);
  return {
    user: userEvent.setup(),
    selectedRole,
    handlers,
    ...testingUtils,
  };
};

describe("RoleSelect", () => {
  it("renders an html select for select role", () => {
    const { getByRole, selectedRole } = renderRoleSelect();
    expect(getByRole("combobox")).toBeInTheDocument();
    expect(getByRole("combobox")).toHaveValue(selectedRole);
   });

  it("calls onChangeRole and updates the selected value", async () => {
    const { user, getByRole, handlers } = renderRoleSelect();
    const select = getByRole("combobox");
    await user.selectOptions(select, NEW_ROLE);
    expect(handlers.onChangeRole).toHaveBeenCalledTimes(1);
    expect(handlers.onChangeRole).toHaveBeenCalledWith(NEW_ROLE);
  });
});
