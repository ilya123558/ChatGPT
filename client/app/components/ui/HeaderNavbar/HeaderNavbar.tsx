import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './HeaderNavbar.module.scss';

const socialSvgItems: { svg: React.ReactNode, title: string, href: string }[] = [
  {
    svg: <svg className={styles.social__item + ' ' + styles.social__item_telegram} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
    </svg>,
    title: 'telegram',
    href: '/'
  },
  {
    svg: <svg className={styles.social__item + ' ' + styles.social__item_instagram} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
    </svg>,
    title: 'instagram',
    href: '/'
  },
  {
    svg: <svg className={styles.social__item + ' ' + styles.social__item_vk} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M23.4493 5.94799C23.6161 5.40154 23.4493 5 22.6553 5H20.0297C19.3621 5 19.0543 5.34687 18.8874 5.72936C18.8874 5.72936 17.5521 8.92607 15.6606 11.0025C15.0487 11.6036 14.7705 11.7949 14.4367 11.7949C14.2698 11.7949 14.0194 11.6036 14.0194 11.0572V5.94799C14.0194 5.29225 13.8345 5 13.2781 5H9.15213C8.73494 5 8.48403 5.30434 8.48403 5.59278C8.48403 6.21441 9.42974 6.35777 9.52722 8.10641V11.9042C9.52722 12.7368 9.37413 12.8878 9.04032 12.8878C8.15023 12.8878 5.98507 9.67682 4.70093 6.00261C4.44927 5.28847 4.19686 5 3.52583 5H0.900218C0.150044 5 0 5.34687 0 5.72936C0 6.41244 0.890141 9.80039 4.14464 14.2812C6.31429 17.3412 9.37118 19 12.1528 19C13.8218 19 14.0283 18.6316 14.0283 17.997V15.6842C14.0283 14.9474 14.1864 14.8003 14.7149 14.8003C15.1043 14.8003 15.7719 14.9916 17.3296 16.467C19.1099 18.2156 19.4034 19 20.4047 19H23.0304C23.7805 19 24.1556 18.6316 23.9392 17.9045C23.7024 17.1799 22.8525 16.1286 21.7247 14.8823C21.1127 14.1719 20.1947 13.4069 19.9165 13.0243C19.5271 12.5326 19.6384 12.314 19.9165 11.8769C19.9165 11.8769 23.1155 7.45067 23.4493 5.94799Z" fill="blue"></path>
    </svg>,
    title: 'vk',
    href: '/'
  },
  {
    svg: <svg className={styles.social__item + ' ' + styles.social__item_git} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="black"></path>
    </svg>,
    title: 'git',
    href: '/'
  },
]

const HeaderNavbar: React.FC = () => {

  const { pathname } = useRouter()

  const [toggle, setToggle] = useState<null | boolean>(null)

  const onClickHandler = () => {
    setToggle(prev => !prev)
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list} >
        {
          [
            { href: '/', text: 'home' },
            { href: '/chat', text: 'chat' },
            { href: '/image', text: 'image generation' },
            { href: '/about', text: 'about' },
            { href: '', text: 'social' }
          ]
            .map(item => item.text === 'social'
              ?
              <li
                className={styles.navbar__item}
                key={item.text}
                style={{ overflow: 'visible' }}>
                <div className={styles.navbar__link + ' ' + styles.social} >
                  <p className={styles.navbar__btn} onClick={onClickHandler}>{item.text}</p>
                  <svg className={styles.social__svg} onClick={onClickHandler} style={{ transform: `rotateX(${toggle ? 180 : 0}deg)` }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                  </svg>
                  {toggle !== null &&
                    <div className={styles.social__popup}>
                      {
                        socialSvgItems.map((item, index) => toggle?
                          <a href={item.href} className={styles.social__inner} style={{ transitionDelay: '0s' }}>
                            <div className={styles.social__bg + ' ' + styles.social__bg_active}></div>
                            <div
                              className={styles.social__inner_item + ' ' + styles.social__inner_item_active}
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              {item.svg}
                              <p> {item.title}</p>
                            </div>
                          </a>
                          :
                          <div className={styles.social__inner} style={{ transitionDelay: '1s' }}>
                            <div className={styles.social__bg + ' ' + styles.social__bg_hidden}></div>
                            <div
                              className={styles.social__inner_item + ' ' + styles.social__inner_item_hidden}
                              style={{ animationDelay: `${(socialSvgItems.length - 1 - index) * 0.1}s` }}
                            >
                              {item.svg}
                              <p> {item.title}</p>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  }
                </div>
              </li>
              :
              <li className={styles.navbar__item} key={item.text}>
                <Link className={styles.navbar__link} href={item.href}>
                  <button className={styles.navbar__btn}>{item.text}</button>
                  <span className={styles.navbar__line} style={{ left: `${item.href === pathname ? 0 : ''}%` }}></span>
                </Link>
              </li>
            )
        }
      </ul >
    </nav >
  );
};

export default HeaderNavbar;