import { useRouter } from 'next/router';
import CommonBtn from '../CommonBtn/CommonBtn';

const BackHomeBtn: React.FC = () => {

    const router = useRouter()

    const onClickHandler = () => {
        router.push('/')
    }

    return (
        <>
            <CommonBtn onClick={onClickHandler} text={'Go Back'}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18" width="16" viewBox="0 0 512 512">
                    <path d="M240,424V328c116.4,0,159.39,33.76,208,96,0-119.23-39.57-240-208-240V88L64,256Z" fill='#fff' />
                </svg>
            </CommonBtn>
        </>
    );
};

export default BackHomeBtn;