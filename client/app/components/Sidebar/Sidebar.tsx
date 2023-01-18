import AddChatBtn from '@components/ui/AddChatBtn/AddChatBtn';
import ChatList from '@components/ui/ChatList/ChatList';
import AuthBtn from '@components/ui/AuthBtn/AuthBtn';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <AddChatBtn onClickHandler={() => console.log('click')}>New chat</AddChatBtn>
                <AuthBtn />
                <ChatList />
            </div>
        </section>
    );
};

export default Sidebar;