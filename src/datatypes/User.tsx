import Role from "./Role";

interface User {
    id: number;
    lastname: string;
    firstname: string;
    username: string;
    password: string;
    role: Role;
}

export default User;