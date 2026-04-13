import { type Role, roles } from "../types/Role";

import { HTMLSelect } from "@blueprintjs/core";

type RoleSelectProps = {
    role: Role;
    onChangeRole: (role:Role) => void;
}

export const RoleSelect = ({ role, onChangeRole }: RoleSelectProps) => {
    return <HTMLSelect
        value={role}
        fill={true}
        onChange={(e) => onChangeRole(e.currentTarget.value as Role)}
        options={roles.map(r=> ({ label: r, value: r }))}
        iconProps={{
            icon: "caret-down"
        }}
    />
}