import { HTMLSelect } from "@blueprintjs/core";

type RoleSelectProps = {
    role: string;
    onChangeRole: (role:string) => void;
}

export const RoleSelect = ({ role, onChangeRole }: RoleSelectProps) => {
    return <HTMLSelect
        value={role}
        fill={true}
        onChange={(e) => onChangeRole(e.currentTarget.value)}
        options={["Administrator", "Engineer", "Support Technician"].map(r=> ({ label: r, value: r }))}
        iconProps={{
            icon: "caret-down"
        }}
    />
}