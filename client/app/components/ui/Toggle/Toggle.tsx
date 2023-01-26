import Link from 'next/link';
import styles from './Toggle.module.scss';

const Toggle: React.FC = () => {
    return (
        <>
            <Link href="/image" className={styles.toggle}>
                Create Image
            </Link>
        </>


    );
};

export default Toggle;