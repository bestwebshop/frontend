import Role from "./Role";

interface User {
    id: number;
    lastname: String;
    firstname: String;
    username: String;

    password?: string;
    role?: Role;
}

export default User;