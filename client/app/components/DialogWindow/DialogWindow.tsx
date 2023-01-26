import ChatMessagesList from '@components/ui/ChatMessagesList/ChatMessagesList';
import MyTextarea from '@components/ui/MyTextarea/MyTextarea';
import Toggle from '@components/ui/Toggle/Toggle';
import styles from './DialogWindow.module.scss';

const DialogWindow = () => {

    return (
        <>
            <main className={styles.dialogWindow}>
                <ChatMessagesList />
                <MyTextarea />
                <div className={styles.blurEffect}></div>
                <Toggle />
            </main>
        </>
    );
};

export default DialogWindow;