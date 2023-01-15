import styles from './AddChatBtn.module.scss'
import { ProviderRpcClient } from 'everscale-inpage-provider';
  
const client = new ProviderRpcClient();
  
async function signInWithEverWallet() {
    if (!(await client.hasProvider())) {
      throw new Error('Extension is not installed');
    }
  
    const { accountInteraction } = await client.requestPermissions({
      permissions: ['basic', 'accountInteraction'],
    });

    if (accountInteraction == null) {
      throw new Error('Insufficient permissions');
    }
  
    const selectedAddress = accountInteraction.address;
    console.log(accountInteraction);

    const body = JSON.stringify({ address: selectedAddress });

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
    };

    fetch("http://localhost:9000/api/auth/extension", requestOptions)
        .then(response => response.text())
        .then(console.log)
        .catch(console.error);

}

const AddChatBtn: React.FC = () => {
    return (
        <>
        <button className={styles.btn}>
            <div className={styles.inner}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New chat
            </div>
        </button>
        <button className={styles.btn} onClick={signInWithEverWallet}>
            <div className={styles.inner}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Sign in with Ever Wallet
            </div>
        </button>
        </>
    );
};

export default AddChatBtn;