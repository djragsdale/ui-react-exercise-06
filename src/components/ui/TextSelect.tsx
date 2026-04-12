import { ReactNode } from "react";
import { MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select, ItemRendererProps, type SelectProps } from "@blueprintjs/select";
import { type MenuItemProps } from "@blueprintjs/core";

import "./TextSelect.scss";

type TextSelectWithSelectProps = {
    itemSelected?: string;
    trigger?: ReactNode;
    usePortal?: boolean;
} & Pick<
    SelectProps<string>,
    "items" | "onItemSelect"
>;

export const TextSelect = ({
    items,
    itemSelected,
    trigger,
    usePortal,
    onItemSelect,
}: TextSelectWithSelectProps) => {
    const getItemProps = (item: string, itemProps: ItemRendererProps): Omit<MenuItemProps, "key"> => {
    const { handleClick, handleFocus, modifiers } = itemProps;
    return {
            active: modifiers.active,
            disabled: modifiers.disabled,
            onClick: handleClick,
            onFocus: handleFocus,
            text: item,
            roleStructure: "none"
        };
    }

    const renderItem: ItemRenderer<string> = (item, props) => {
        return <MenuItem key={item} {...getItemProps(item, props)} />;
    };

    return <Select<string>
            items={items}
            itemRenderer={renderItem}
            filterable={false}
            activeItem={itemSelected}
            onItemSelect={onItemSelect}
            popoverProps={{
                popoverClassName: "text-select-popover",
                usePortal,
                matchTargetWidth: true
            }}
        >
            {trigger}
        </Select>;
};