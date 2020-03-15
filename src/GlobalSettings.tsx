import User from "./datatypes/User";

const GlobalSettings = {
  hostname: "bestwebshop.tech", // use "localhost" here for local deployment
  defaultLoggedInUser: {
    id: -1,
    lastname: "login_default_lastname",
    firstname: "login_default_firstname",
    username: "login_default_username",
    password: "login_default_password",
    role: {
      id: -1,
      typ: "-",
      level: -1 // 0=admin, 1=user
    }
  } as User
};
export default GlobalSettings;
