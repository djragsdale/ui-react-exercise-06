import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { roles, type Role } from "../types/Role";

import { RoleSelect } from "./RoleSelect";

describe("RoleSelect", () => {
  it("renders an html select for select role", () => {
    render(
    <RoleSelect role={roles[0]} onChangeRole={jest.fn()}/>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue(roles[0]);
   });

  it("calls onChangeRole and updates the selected value", async () => {
    const user = userEvent.setup();
    const onChangeRole = jest.fn();

    const Container = () => {
      const [role, setRole] = useState<Role>(roles[0]);

      const handleChange = (r: Role) => {
        onChangeRole(r);
        setRole(r);
      };

      return (
        <RoleSelect
          role={role}
          onChangeRole={handleChange}
        />
      )
    };

    render(<Container />);
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, roles[1]);
    expect(onChangeRole).toHaveBeenCalledTimes(1);
    expect(onChangeRole).toHaveBeenCalledWith(roles[1]);
    expect(select).toHaveValue(roles[1]);
  });
});
