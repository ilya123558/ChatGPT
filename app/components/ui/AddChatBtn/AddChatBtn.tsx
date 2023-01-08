import styles from './AddChatBtn.module.scss'

const AddChatBtn: React.FC = () => {
    return (
        <button className={styles.btn}>
            <div className={styles.inner}>
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New chat
            </div>
        </button>
    );
};

export default AddChatBtn;