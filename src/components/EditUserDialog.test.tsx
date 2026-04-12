import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useState } from "react";
import { EditUserDialog } from "./EditUserDialog";

const testUser = {
    idUser: 1,
    profile: {
      firstName: "ABC",
      lastName: "DEF",
    },
    role: "Enginner",
};

describe("EditUserDialog", () => {
  it("If the user chooses to cancel the role change, the UserList does not update", async () => {
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
        onEditUser={onEditUser}
        onClose={cancel}
      />
    </>
    )};

    render(<ContainerDialog />);
    
    await user.click(screen.getByText("Open dialog"));
    await user.click(screen.getByText("Cancel"));

    expect(cancel).toHaveBeenCalled();
  });

  it("The UserList does not update until the user clicks a Save button in the dialog", async () => {
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
        onEditUser={onEditUser}
        onClose={cancel}
      />
    </>
    )};

    render(<ContainerDialog />);
    
    await user.click(screen.getByText("Open dialog"));

    const trigger = await screen.findByText("Open dialog");

    await user.click(trigger);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByText(testUser.role));
    await user.click(screen.getByText("Administrator"));
    
    expect(onEditUser).not.toHaveBeenCalled();
    await user.click(screen.getByText("Save"));
    expect(onEditUser).toHaveBeenCalled();
    expect(onEditUser).toHaveBeenCalledWith(testUser.idUser, { ...testUser, role: "Administrator" });
  });

  it("The dialog closes when the user saves the role change", async () => {
    const user = userEvent.setup();
    const close = jest.fn();
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
          onEditUser={onEditUser}
          onClose={close}
        />
      </>
    )};

    render(<ContainerDialog />);

    await user.click(screen.getByText("Open dialog"));

    await user.click(screen.getByText(testUser.role));
    await user.click(screen.getByText("Administrator"));

    await user.click(screen.getByText("Save"));
    expect(onEditUser).toHaveBeenCalled();
    expect(onEditUser).toHaveBeenCalledWith(testUser.idUser, { ...testUser, role: "Administrator" });
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
          onEditUser={onEditUser}
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
