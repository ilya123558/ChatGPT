import AddChatBtn from '@components/ui/AddChatBtn/AddChatBtn';
import ChatList from '@components/ui/ChatList/ChatList';
import LogoutBtn from '@components/ui/LogoutBtn/LogoutBtn';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <div>
                    <AddChatBtn onClickHandler={() => console.log('click')}>New chat</AddChatBtn>
                    <ChatList />
                </div>

                <LogoutBtn />
            </div>
        </section>
    );
};

export default Sidebar;