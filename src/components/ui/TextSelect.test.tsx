import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@blueprintjs/core";

import { TextSelect } from "./TextSelect";

const testItems = ["one", "two"];
const triggerText = "Select a number";
const roleListBox = "listbox";
const Trigger = () => <Button text={triggerText} />

describe("TextSelect", () => {
  it("renders text select", () => {
    render(
    <TextSelect
      items={testItems}
      usePortal={false}
      onItemSelect={jest.fn()}
      getKey={(r) => r}
      getLabel={(r) => r}
      trigger={<Trigger />}
    />
    );

    expect(screen.getByText(triggerText)).toBeInTheDocument();
   });

  it("text select is open when click on trigger", async () => {
    const user = userEvent.setup();

    render(
        <TextSelect
        items={testItems}
        usePortal={false}
        onItemSelect={jest.fn()}
        getKey={(r) => r}
        getLabel={(r) => r}
        trigger={<Trigger />}
        />
    );

    expect(screen.getByText(triggerText)).toBeInTheDocument();

    await user.click(screen.getByText(triggerText));

    expect(await screen.findByRole(roleListBox)).toBeInTheDocument();
  });

  it("invokes onItemSelect callback when menuitem is pressed", async () => {
    const onItemSelect = jest.fn();
    const user = userEvent.setup();
    render(<TextSelect
        items={testItems}
        usePortal={false}
        onItemSelect={onItemSelect}
        getKey={(r) => r}
        getLabel={(r) => r}
        trigger={<Trigger />}
    />);

    await user.click(screen.getByText(triggerText));
    await user.click(await screen.findByText(testItems[0]));

    expect(onItemSelect).toHaveBeenCalled();
    expect(onItemSelect.mock.calls[0][0]).toBe(testItems[0]);
  });

  it("closes popover after selecting an item", async () => {
    const user = userEvent.setup();
    const onItemSelect = jest.fn();

    render(
        <TextSelect
        items={testItems}
        usePortal={false}
        onItemSelect={onItemSelect}
        getKey={(r) => r}
        getLabel={(r) => r}
        trigger={<Trigger />}
        />
    );

    await user.click(screen.getByText(triggerText));
    await user.click(await screen.findByText(testItems[0]));
    await waitFor(() => {
        expect(screen.queryByRole(roleListBox)).not.toBeInTheDocument();
    });
  });
});
