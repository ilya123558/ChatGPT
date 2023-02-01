import Link from 'next/link';
import styles from './BackHomeBtnCreateImagePage.module.scss';

const BackHomeBtnCreateImagePage: React.FC = () => {
    return (
        <Link href='/'>
            <div className={styles.wrapper}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18" width="16" viewBox="0 0 512 512">
                    <path d="M240,424V328c116.4,0,159.39,33.76,208,96,0-119.23-39.57-240-208-240V88L64,256Z" fill='#fff' />
                </svg>
                <p>Go Back</p>
            </div>
        </Link>
    );
};

export default BackHomeBtnCreateImagePage;