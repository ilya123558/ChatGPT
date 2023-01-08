import AddChatBtn from '@components/ui/AddChatBtn/AddChatBtn';
import ChatList from '@components/ui/ChatList/ChatList';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <AddChatBtn />
                <ChatList />
            </div>
        </section>
    );
};

export default Sidebar;