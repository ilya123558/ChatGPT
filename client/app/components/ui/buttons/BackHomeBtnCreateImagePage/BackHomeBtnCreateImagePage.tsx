import Link from 'next/link';
import styles from './BackHomeBtnCreateImagePage.module.scss';

const BackHomeBtnCreateImagePage: React.FC = () => {
    return (
        <Link href='/'>
            <div className={styles.wrapper}>
                Return home
            </div>
        </Link>
    );
};

export default BackHomeBtnCreateImagePage;