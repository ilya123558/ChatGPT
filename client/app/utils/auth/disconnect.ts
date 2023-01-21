import { TProvider } from "../../models/IProvider";

export const disconnect = async (provider: TProvider): Promise<void> => {
    if (provider) {
        await provider.disconnect();
    }
}