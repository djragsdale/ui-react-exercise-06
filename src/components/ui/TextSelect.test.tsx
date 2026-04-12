import { act, render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextSelect } from "./TextSelect";
import { Button } from "@blueprintjs/core";

const testRoles = ["Enginner", "Administrator", "Support Technician"];

describe("TextSelect", () => {
  it("renders text select", () => {
    render(
    <TextSelect
      items={testRoles}
      usePortal={false}
      onItemSelect={jest.fn()}
      trigger={<Button text="Select role" />}
    />
    );

    expect(screen.getByText("Select role")).toBeInTheDocument();
   });

  it("text select is open when click on trigger", async () => {
    const user = userEvent.setup();

    render(
        <TextSelect
        items={testRoles}
        usePortal={false}
        onItemSelect={jest.fn()}
        trigger={<Button text="Select role" />}
        />
    );

    expect(screen.getByText("Select role")).toBeInTheDocument();

    await user.click(screen.getByText("Select role"));

    const popover = screen.queryByRole("listbox");

    expect(popover).toBeInTheDocument();
  });

  it("invokes onItemSelect callback when menuitem is pressed", async () => {
    const onItemSelect = jest.fn();
    const user = userEvent.setup();
    render(<TextSelect
        items={testRoles}
        usePortal={false}
        onItemSelect={onItemSelect}
        trigger={<Button text="Select role" />}
    />);

    await user.click(screen.getByText("Select role"));
    await user.click(await screen.findByText(testRoles[0]));

    expect(onItemSelect).toHaveBeenCalled();
    expect(onItemSelect.mock.calls[0][0]).toBe(testRoles[0]);
  });

  it("closes popover after selecting an item", async () => {
    const user = userEvent.setup();
    const onItemSelect = jest.fn();

    render(
        <TextSelect
        items={testRoles}
        usePortal={false}
        onItemSelect={onItemSelect}
        trigger={<Button text="Select role" />}
        />
    );

    await user.click(screen.getByText("Select role"));
    await user.click(await screen.findByText(testRoles[0]));
    const popover = screen.queryByRole("listbox");

    await waitFor(() => {
        expect(popover).not.toBeInTheDocument();
    });
  });
});
