import { ReactNode } from "react";
import { MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select, ItemRendererProps, type SelectProps } from "@blueprintjs/select";
import { type MenuItemProps } from "@blueprintjs/core";

import "./TextSelect.scss";

type TextSelectWithSelectProps<T> = {
    itemSelected?: T;
    items: readonly T[];
    trigger?: ReactNode;
    usePortal?: boolean;
    getLabel?: (item: T) => string;
    getKey?: (item: T) => React.Key;
} & Pick<SelectProps<T>, "items" | "onItemSelect">;

export const TextSelect = <T,>({
    items,
    itemSelected,
    trigger,
    usePortal,
    onItemSelect,
    getLabel,
    getKey,
}: TextSelectWithSelectProps<T>) => {
    const getItemProps = (
        item: T,
        itemProps: ItemRendererProps
    ): Omit<MenuItemProps, "key"> => {
    const { handleClick, handleFocus, modifiers } = itemProps;
    return {
            active: modifiers.active,
            disabled: modifiers.disabled,
            onClick: handleClick,
            onFocus: handleFocus,
            text: getLabel?.(item),
            roleStructure: "none"
        };
    }

    const renderItem: ItemRenderer<T> = (item, props) => {
        return <MenuItem key={getKey?.(item)} {...getItemProps(item, props)} />;
    };

    return <Select<T>
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