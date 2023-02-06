import styles from './Header.module.scss';
import logo from '@assets/images/home/logo.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import LogoutBtn from '../buttons/LogoutBtn/LogoutBtn';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';

const Header: React.FC<{ auth: boolean }> = ({ auth }) => {
    const router = useRouter()

    const onClickHandler = () => {
        router.push('/auth/login')
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo__inner}>
                <Image className={styles.logo__image} src={logo} alt="img" />
                <p className={styles.logo__text}>Rezis</p>
            </div>
            <HeaderNavbar />
            {auth
                ? <LogoutBtn />
                : <button className={styles.login_btn} onClick={onClickHandler}>Log in</button>
            }
        </header>
    );
};

export default Header;