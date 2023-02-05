import styles from './Header.module.scss';
import logo from '@assets/images/home/logo.png'
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo__inner}>
                <Image className={styles.logo__image} src={logo} alt="img" />
                <p className={styles.logo__text}>Rezis</p>
            </div>
            <nav className={styles.navbar}>
                <ul className={styles.navbar__list} >

                    <li className={styles.navbar__item}>
                        <Link className={styles.navbar__link} href={'/'}>
                            <button className={styles.navbar__btn}>chat</button>
                            <span className={styles.navbar__line}></span>
                        </Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link className={styles.navbar__link} href={'/'}>
                            <button className={styles.navbar__btn}>image generation</button>
                            <span className={styles.navbar__line}></span>
                        </Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link className={styles.navbar__link} href={'/'}>
                            <button className={styles.navbar__btn}>about</button>
                            <span className={styles.navbar__line}></span>
                        </Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link className={styles.navbar__link} href={'/'}>
                            <button className={styles.navbar__btn}>support</button>
                            <span className={styles.navbar__line}></span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <button className={styles.exit_btn}>sing in</button>
        </header>
    );
};

export default Header;