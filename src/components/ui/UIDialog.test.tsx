import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { UIDialog } from "./UIDialog";

describe("UIDialog", () => {
  it("UIDialog is not open the first time", async () => {
    const ContainerDialog = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open dialog</button>
          <UIDialog isOpen={open} />
        </>
      )
    };
    render(<ContainerDialog />);

    expect(screen.queryByRole("dialog")).toBeNull();
   });

  it("UIDialog is open when click on trigger", async () => {
    const user = userEvent.setup();

    const ContainerDialog = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <button onClick={() => setOpen(true)}>Open dialog</button>
          <UIDialog isOpen={open} />
        </>
      )
    };

    render(<ContainerDialog />);

    const trigger = await screen.findByText("Open dialog");

    await user.click(trigger);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
