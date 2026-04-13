import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { roles } from "../types/Role";

import { useState } from "react";
import { EditUserDialog } from "./EditUserDialog";

const testUser = {
    idUser: 1,
    profile: {
      firstName: "ABC",
      lastName: "DEF",
    },
    role: roles[0],
};

const testEditedRole = roles[1];

describe("EditUserDialog", () => {
  it("If the user chooses to cancel the role change, the UserList does not update", async () => {
    const user = userEvent.setup();
    const cancel = jest.fn();
    const onUpdateUser = jest.fn();

    const ContainerDialog = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser,] = useState(testUser);
    return (
    <>
      <button onClick={() => setOpen(true)}>Open dialog</button>

      <EditUserDialog
        isOpen={open}
        userData={selectedUser}
        onUpdateUser={onUpdateUser}
        onClose={cancel}
      />
    </>
    )};

    render(<ContainerDialog />);
    
    await user.click(screen.getByText("Open dialog"));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByText("Cancel"));

    expect(onUpdateUser).not.toHaveBeenCalled();
    expect(cancel).toHaveBeenCalled();
  });

  it("The UserList does not update until the user clicks a Save button in the dialog", async () => {
    const user = userEvent.setup();
    const cancel = jest.fn();
    const onUpdateUser = jest.fn();

    const ContainerDialog = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser] = useState(testUser);

    return (
    <>
      <button onClick={() => setOpen(true)}>Open dialog</button>

      <EditUserDialog
        isOpen={open}
        userData={selectedUser}
        onUpdateUser={onUpdateUser}
        onClose={cancel}
      />
    </>
    )};

    render(<ContainerDialog />);
    
    const trigger = await screen.findByText("Open dialog");

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(testUser.role);

    await user.selectOptions(select, roles[1]);
    
    expect(select).toHaveValue(roles[1]);
    expect(onUpdateUser).not.toHaveBeenCalled();
    await user.click(screen.getByText("Save"));
    expect(onUpdateUser).toHaveBeenCalled();
    expect(onUpdateUser).toHaveBeenCalledWith(testUser.idUser, { ...testUser, role: testEditedRole });
  });

  it("The dialog closes when the user saves the role change", async () => {
    const user = userEvent.setup();
    const close = jest.fn();
    const onUpdateUser = jest.fn();

    const ContainerDialog = () => {
      const [open, setOpen] = useState(false);
      const [selectedUser,] = useState(testUser);
      return (
      <>
        <button onClick={() => setOpen(true)}>Open dialog</button>
        <EditUserDialog
          isOpen={open}
          userData={selectedUser}
          onUpdateUser={onUpdateUser}
          onClose={close}
        />
      </>
    )};

    render(<ContainerDialog />);

    const trigger = await screen.findByText("Open dialog");

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(testUser.role);

    await user.selectOptions(select, roles[1]);
    
    expect(select).toHaveValue(roles[1]);
    expect(onUpdateUser).not.toHaveBeenCalled();
    await user.click(screen.getByText("Save"));
    expect(onUpdateUser).toHaveBeenCalled();
    expect(onUpdateUser).toHaveBeenCalledWith(testUser.idUser, { ...testUser, role: testEditedRole });
    expect(close).toHaveBeenCalled();
  });

  it("The dialog displays all available user data, even values not being changed", async () => {
    const user = userEvent.setup();
    const cancel = jest.fn();
    const onEditUser = jest.fn();

    const ContainerDialog = () => {
      const [open, setOpen] = useState(false);
      const [selectedUser,] = useState(testUser);
      return (
      <>
        <button onClick={() => setOpen(true)}>Open dialog</button>
        <EditUserDialog
          isOpen={open}
          userData={selectedUser}
          onUpdateUser={onEditUser}
          onClose={cancel}
        />
      </>
    )};

    render(<ContainerDialog />);

    await user.click(screen.getByText("Open dialog"));

    expect(screen.getByText(testUser.idUser));
    expect(screen.getByText(testUser.profile.firstName));
    expect(screen.getByText(testUser.profile.lastName));
    expect(screen.getByText(testUser.role));
    });
});
