import styles from "./AddChatBtn.module.scss";
import { ProviderRpcClient } from "everscale-inpage-provider";

const provider = new ProviderRpcClient();

async function signInWithEverWallet() {
  await disconnect();

  if (!(await provider.hasProvider())) {
    throw new Error("Extension is not installed");
  }

  const { accountInteraction } = await provider.requestPermissions({
    permissions: ["basic", "accountInteraction"],
  });

  if (accountInteraction == null) {
    throw new Error("Insufficient permissions");
  }

  const userAddress = accountInteraction.address.toString();
  console.log(userAddress);
  const nonce = await getUserNonce(userAddress);
  console.log(nonce);

  if (!nonce) {
    return "account_error";
  }

  if (nonce) {
    const signedData = await provider.signDataRaw({
      data: btoa(nonce),
      publicKey: accountInteraction.publicKey,
    });

    const body = JSON.stringify({
      address: userAddress,
      signed: btoa(atob(signedData.signature) + nonce),
      signature: accountInteraction.publicKey,
    });
    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };

    fetch("http://localhost:9000/api/auth/extension", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("Error ", error));
  }
}

async function getUserNonce(address: string): Promise<string | void> {
  const requestOptions = {
    method: "GET",
  };

  return fetch(
    `http://localhost:9000/api/user/nonce/${address}`,
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.log("Error ", error));
}

async function logout() {
  await disconnect();

  const requestOptions = {
    method: "DELETE",
    credentials: "include" as RequestCredentials,
  };

  fetch("http://localhost:9000/api/auth/logout", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function disconnect(): Promise<void> {
  if (provider) {
    await provider.disconnect();
  }
}

const AddChatBtn: React.FC = () => {
  return (
    <>
      <button className={styles.btn}>
        <div className={styles.inner}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New chat
        </div>
      </button>
      <button className={styles.btn} onClick={signInWithEverWallet}>
        <div className={styles.inner}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Sign in with Ever Wallet
        </div>
      </button>
      <button className={styles.btn} onClick={logout}>
        <div className={styles.inner}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Sign out
        </div>
      </button>
    </>
  );
};

export default AddChatBtn;
