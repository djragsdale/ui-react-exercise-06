import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { type Role } from "../types/Role";

import { UserRow } from "./UserRow";
import { User } from "../types/User";

const OLD_ROLE: Role = "Engineer";

const createTestUser = () => ({
    idUser: 1,
    profile: {
      firstName: "ABC",
      lastName: "DEF",
    },
    role: OLD_ROLE,
});

const renderRow = (props = {}) => {
  const testUser: User = createTestUser();
  const callbacks = { onEditUser: jest.fn() };
  const container = <table>
                      <tbody>
                        <UserRow userItem={testUser} {...props} {...callbacks} />
                      </tbody>
                    </table>;
  return ({
    user: userEvent.setup(),
    rowUser: testUser,
    callbacks,
    ...render(container)
  });
};

describe("UserRow", () => {
  it("renders a user in a row", () => {
    const { container, rowUser } = renderRow();
    const row = container.querySelector("tr");
    expect(row?.textContent).toMatch(rowUser.idUser.toString());
    expect(row?.textContent).toMatch(rowUser.profile.firstName);
    expect(row?.textContent).toMatch(rowUser.profile.lastName);
    expect(row?.textContent).toMatch(rowUser.role);
  });

  it("invokes onEditUser callback when Edit button is pressed", async () => {
    const { user, getByRole, rowUser, callbacks } = renderRow();
    await user.click(getByRole("button", { name: /edit/i }));
    expect(callbacks.onEditUser).toHaveBeenLastCalledWith(rowUser);
  });
});
