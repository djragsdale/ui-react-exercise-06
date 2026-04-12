import { useState } from "react";
import { TextSelect } from "./ui/TextSelect";

import { Button } from "@blueprintjs/core";

const roles = ["Enginner", "Administrator", "Support Technician"];

type RoleSelectProps = {
    role?: string;
    onChangeRole: (role:string) => void;
}

export const RoleSelect = ({ role, onChangeRole }: RoleSelectProps) => {
    const [roleSelected, setRoleSelected] = useState(role?? "");

    const handleSelect = (role: string) => {
        setRoleSelected(role);
        onChangeRole(role);
    }

    return <TextSelect
                items={roles}
                itemSelected={roleSelected}
                usePortal={false}
                onItemSelect={handleSelect}
                trigger={
                    <Button
                        style={{ width: "100%" }}
                        alignText="left"
                        text={roleSelected}
                        rightIcon="caret-down"
                    />
                }
            />;
}