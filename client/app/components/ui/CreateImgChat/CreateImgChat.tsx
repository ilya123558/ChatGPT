import AddChatBtn from "../buttons/AddChatBtn/AddChatBtn";
import styles from './CreateImgChat.module.scss'

const CreateImgChat: React.FC = () => {

    const onClickHandler = () => {

    }

    return (
        <div className={styles.wrapper}>
            <AddChatBtn onClickHandler={onClickHandler} >Create Image</AddChatBtn>
        </div>
    );
};

export default CreateImgChat;