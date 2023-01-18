import { disconnect } from "./disconnect";
import getUserNonce from "./getUserNonce";
import { TProvider } from "../../models/IProvider";

interface SignIn {
    provider: TProvider,
    setErrorMessage: (prevState: string) => void,
    signIn: any,
}

export const signInFunction = async ({provider, setErrorMessage, signIn}: SignIn) => {
    await disconnect(provider);

    const { accountInteraction } = await provider.requestPermissions({
        permissions: ["basic", "accountInteraction"],
    });

    if (!accountInteraction) {
        setErrorMessage('Нет accountInteraction')
        return
    }

    const userAddress = accountInteraction.address.toString();
    const nonce = await getUserNonce(userAddress);

    if (!nonce) {
        setErrorMessage("нет nonce")
        return
    }

    const signedData = await provider.signDataRaw({
        data: btoa(nonce),
        publicKey: accountInteraction.publicKey,
    });

    await signIn({ accountInteraction, nonce, signedData, userAddress })
}