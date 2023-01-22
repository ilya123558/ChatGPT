import { useAppDispatch } from '@hooks/redux';
import { useDeleteAllChatsMutation } from '@services/ChatService.api';
import { setActiveChatIndex } from 'slices/MainSlice';
import CommonBtn from '../CommonBtn/CommonBtn';

const DeleteChatListBtn: React.FC = () => {

    const dispatch = useAppDispatch()
    const [deleteAllChats] = useDeleteAllChatsMutation()

    const onClickHandler = async() => {
        await deleteAllChats(null)
        dispatch(setActiveChatIndex(null))
    }

    return (
        <>
            <CommonBtn onClick={onClickHandler} text={'Clear conversations'}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </CommonBtn>
        </>
    );
};

export default DeleteChatListBtn;