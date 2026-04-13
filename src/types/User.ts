import type { Role } from "./Role";

export type User = {
  idUser: number;
  profile: {
    firstName: string;
    lastName: string;
  };
  role: Role;
};
