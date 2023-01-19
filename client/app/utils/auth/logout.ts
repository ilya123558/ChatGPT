import { disconnect } from "./disconnect";
import { TProvider } from "../../models/IProvider";

interface Logout {
    provider: TProvider,
    logout: any,
    userId: string
}

export const logoutFunction = async ({provider, logout, userId}: Logout) => {
    await disconnect(provider);
    await logout(userId)
}