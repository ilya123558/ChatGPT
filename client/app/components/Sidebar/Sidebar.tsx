import AddChatBtn from '@components/ui/buttons/AddChatBtn/AddChatBtn';
import ChatList from '@components/ui/ChatList/ChatList';
import DeleteChatList from '@components/ui/buttons/DeleteChatListBtn/DeleteChatListBtn';
import LogoutBtn from '@components/ui/buttons/LogoutBtn/LogoutBtn';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.chatListInner}>
                    <AddChatBtn onClickHandler={() => console.log('click')}>New chat</AddChatBtn>
                    <ChatList />
                </div>
                <div className={styles.buttonsInner}>
                    <DeleteChatList />
                    <LogoutBtn />
                </div>
            </div>
        </section>
    );
};

export default Sidebar;