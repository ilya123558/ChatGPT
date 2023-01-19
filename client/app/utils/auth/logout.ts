import { disconnect } from "./disconnect";
import { TProvider } from "../../models/IProvider";

interface Logout {
  provider: TProvider;
  logout: any;
  user: any;
}

export const logoutFunction = async ({ provider, logout, user }: Logout) => {
  await disconnect(provider);
  await logout(user);
};
