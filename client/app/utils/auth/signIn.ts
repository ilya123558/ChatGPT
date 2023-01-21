import { disconnect } from "./disconnect";
import getUserNonce from "./getUserNonce";
import { TProvider } from "../../models/IProvider";

interface SignIn {
    provider: TProvider,
    signIn: any,
}

export const signInFunction = async ({provider, signIn}: SignIn) => {
    await disconnect(provider);

    const { accountInteraction } = await provider.requestPermissions({
        permissions: ["basic", "accountInteraction"],
    });

    if (!accountInteraction) {
        return
    }

    const userAddress = accountInteraction.address.toString();
    const nonce = await getUserNonce(userAddress);

    if (!nonce) {
        return
    }

    const signedData = await provider.signDataRaw({
        data: btoa(nonce),
        publicKey: accountInteraction.publicKey,
    });

    await signIn({ accountInteraction, nonce, signedData, userAddress })
}