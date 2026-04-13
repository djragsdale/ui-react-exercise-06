import { Role, roles } from "../types/Role";

import { HTMLSelect } from "@blueprintjs/core";

type RoleSelectProps = {
    role?: Role;
    onChangeRole?: (role:Role) => void;
}

export const RoleSelect = ({ role, onChangeRole }: RoleSelectProps) => {
    return <HTMLSelect
        value={role}
        onChange={(e) => onChangeRole?.(e.target.value as Role)}
        options={roles.map(r=> ({ label: r, value: r }))}
        placeholder={"Select role"}
        iconProps={{
            icon: "caret-down"
        }}
    />
}