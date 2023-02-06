import Link from 'next/link';
import styles from './HeaderNavbar.module.scss';

const HeaderNavbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar__list} >
                {
                    [
                        { href: '/chat', text: 'chat' },
                        { href: '/image', text: 'image generation' },
                        { href: '/', text: 'about' },
                        { href: '/', text: 'support' }
                    ]
                        .map(item => (
                            <li className={styles.navbar__item} key={item.text}>
                                <Link className={styles.navbar__link} href={item.href}>
                                    <button className={styles.navbar__btn}>{item.text}</button>
                                    <span className={styles.navbar__line}></span>
                                </Link>
                            </li>
                        ))
                }
            </ul>
        </nav>
    );
};

export default HeaderNavbar;