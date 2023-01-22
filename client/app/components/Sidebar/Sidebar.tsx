import AddChatBtn from '@components/ui/buttons/AddChatBtn/AddChatBtn';
import ChatList from '@components/ui/ChatList/ChatList';
import DeleteChatList from '@components/ui/buttons/DeleteChatListBtn/DeleteChatListBtn';
import LogoutBtn from '@components/ui/buttons/LogoutBtn/LogoutBtn';
import styles from './Sidebar.module.scss';
import { useAppDispatch } from '@hooks/redux';
import { setActiveChatIndex } from 'slices/MainSlice';

const Sidebar: React.FC = () => {

    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(setActiveChatIndex(null))
    }

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.chatListInner}>
                    <AddChatBtn onClickHandler={onClickHandler}>New chat</AddChatBtn>
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