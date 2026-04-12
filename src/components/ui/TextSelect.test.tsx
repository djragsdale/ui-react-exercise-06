import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@blueprintjs/core";

import { TextSelect } from "./TextSelect";

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

    expect(await screen.findByRole("listbox")).toBeInTheDocument();
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
    await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
