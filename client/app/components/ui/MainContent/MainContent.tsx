import Image from 'next/image';
import styles from './HomeMain.module.scss';
import chatGptBdImg from '@assets/images/home/chatGptBdImg.png'
import imageGenerationBgImg from '@assets/images/home/imageGenerationBgImg.png'
import ChatGpt from '@assets/images/home/ChatGpt.jpg'
import GenerateImage from '@assets/images/home/GenerateImage.png'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const HomeMain: React.FC = () => {

    const { pathname } = useRouter()
    const [className, setClassName] = useState(styles.item)

    useEffect(() => {
        if (pathname === '/about') {
            setClassName(styles.item_about)
            return
        }

        setClassName(styles.item)

    }, [pathname])

    return (
        <main className={styles.home_main}>
            <div className={styles.site}>
                <div className={styles.site__items}>
                    <Link href={'/chat'} className={className}>
                        <Image className={styles.item__bg} src={chatGptBdImg} alt={'img'} />
                        <Image className={styles.item__image} src={ChatGpt} alt={'img'} />
                        <div className={styles.item__title}>
                            <p className={styles.item__title_text}>Chat GPT</p>
                            <div className={styles.item__decor_line}></div>
                        </div>
                        <p className={styles.item_about__text}>
                            ChatGPT is a pre-trained language model developed by OpenAI,
                            which uses deep learning techniques such as transformer
                            networks to generate human-like text.
                            It operates by taking an input sequence of text,
                            encoding it into a numerical representation,
                            and then using that representation to generate an output sequence of text,
                            predicting the next word in the sequence given the context.
                            The model is trained on a large corpus of text data,
                            allowing it to generate text that is similar
                            in style and content to the training data.
                        </p>
                    </Link>
                    <Link href={'/image'} className={className}>
                        <Image className={styles.item__bg} src={imageGenerationBgImg} alt={'img'} />
                        <Image className={styles.item__image} src={GenerateImage} alt={'img'} />
                        <div className={styles.item__title}>
                            <p className={styles.item__title_text}>Image Generation</p>
                            <div className={styles.item__decor_line}></div>
                        </div>
                        <p className={styles.item_about__text}>
                            Image generation using neural networks involves
                            training a generative network on a dataset
                            of real images, then using the trained network
                            to generate new synthetic images. The input
                            image is first compressed into a lower-dimensional
                            representation through an encoder network,
                            then expanded back into an image through a
                            decoder network. The generated image is
                            made as similar as possible to the training
                            image during training. The process
                            uses deep learning and computer vision
                            techniques to generate new images.
                        </p>
                    </Link>
                </div>
            </div>
        </main >
    );
};

export default HomeMain;