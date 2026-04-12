import { useState, useEffect } from "react";

import { Role, roles } from "../types/Role";

import { TextSelect } from "./ui/TextSelect";
import { Button } from "@blueprintjs/core";

const defaultSelectRole = "Select role";

type RoleSelectProps = {
    role?: Role;
    onChangeRole: (role:Role) => void;
}

export const RoleSelect = ({ role, onChangeRole }: RoleSelectProps) => {
    const [roleSelected, setRoleSelected] = useState<Role | undefined>(role);

    useEffect(() => {
        setRoleSelected(role);
    }, [role]);

    const handleSelect = (item: Role) => {
        setRoleSelected(item);
        onChangeRole(item);
    }

    return <TextSelect
                items={roles}
                itemSelected={roleSelected}
                usePortal={false}
                onItemSelect={handleSelect}
                getKey={(r) => r}
                getLabel={(r) => r}
                trigger={
                    <Button
                        style={{ width: "100%" }}
                        alignText="left"
                        text={roleSelected?? defaultSelectRole}
                        rightIcon="caret-down"
                    />
                }
            />;
}