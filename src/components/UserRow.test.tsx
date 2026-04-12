import { act, render } from "@testing-library/react";

import { UserRow } from "./UserRow";
import { roles } from "../types/Role";

const testUser = {
    idUser: 1,
    profile: {
      firstName: "ABC",
      lastName: "DEF",
    },
    role: roles[0],
};

describe("UserRow", () => {
  it("renders a user in a row", () => {
    const { container } = render(<table><tbody><UserRow userItem={testUser} /></tbody></table>);
    const row = container.querySelector("tr");
    expect(row?.textContent).toMatch("1");
    expect(row?.textContent).toMatch("ABC");
    expect(row?.textContent).toMatch("DEF");
    expect(row?.textContent).toMatch(roles[0]);
  });

  it("invokes onEditUser callback when Edit button is pressed", () => {
    const onEditUser = jest.fn();
    const { container } = render(<table><tbody>
                                          <UserRow userItem={testUser} onEditUser={onEditUser} />
                                        </tbody>
                                </table>);
    const row = container.querySelector("tr");
    const editButton = row?.querySelector<"button">("button");
    expect(editButton).toBeTruthy();
    act(() => {
        editButton?.click();
    });
    expect(onEditUser).toHaveBeenLastCalledWith(testUser);
  });
});
