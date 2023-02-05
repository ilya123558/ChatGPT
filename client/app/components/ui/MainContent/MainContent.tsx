import Image from 'next/image';
import styles from './HomeMain.module.scss';
import chatGptBdImg from '@assets/images/home/chatGptBdImg.png'
import imageGenerationBgImg from '@assets/images/home/imageGenerationBgImg.png'
import ChatGpt from '@assets/images/home/ChatGpt.jpg'
import GenerateImage from '@assets/images/home/GenerateImage.png'
import Link from 'next/link';


const HomeMain: React.FC = () => {
    return (
        <main className={styles.home_main}>
            <div className={styles.site}>
                <div className={styles.site__items}>
                    <Link href={'/chat'} className={styles.site__item + ' ' + styles.item}>
                        <Image className={styles.item__bg} src={chatGptBdImg} alt={'img'} />
                        <Image className={styles.item__image} src={ChatGpt} alt={'img'} />
                        <div className={styles.item__title}>
                            <p>Chat GPT</p>
                            <div className={styles.item__decor_line}></div>
                        </div>
                    </Link>
                    <Link href={'/image'} className={styles.site__item + ' ' + styles.item}>
                        <Image className={styles.item__bg} src={imageGenerationBgImg} alt={'img'} />
                        <Image className={styles.item__image} src={GenerateImage} alt={'img'} />
                        <div className={styles.item__title}>
                            <p>Image Generation</p>
                            <div className={styles.item__decor_line}></div>
                        </div>
                    </Link>
                </div>
            </div>
        </main >
    );
};

export default HomeMain;