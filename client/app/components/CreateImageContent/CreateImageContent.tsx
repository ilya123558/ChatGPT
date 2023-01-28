import GenerateImageBtn from '@components/ui/buttons/GenerateImageBtn/GenerateImageBtn';
import Carousel from '@components/ui/Carousel/Carousel';
import MySelect from '@components/ui/MySelect/MySelect';
import React, { useState } from 'react';
import styles from './CreateImageContent.module.scss';

const CreateImageContent: React.FC = () => {

    const [counter, setCounter] = useState(200);
    const [value, setValue] = useState('')

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => event.target.value)
        setCounter(event.target.value.length * 4);
        if (event.target.value.length === 0) {
            setCounter(100);
        }
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Text to Image with <br /> AI Image Generator</h1>
            <p className={styles.text}>
                Convert words to images in seconds with Fotor's free AI image generator. Input the text prompts and transfer your imagination into arts now.
            </p>
            <div className={styles.inputInner}>
                <input
                    className={styles.input}
                    onChange={onChangeHandler}
                    placeholder="Send tags"
                    value={value}
                />
                <span className={styles.underline} style={{ width: `${counter}%` }}></span>
            </div>
            <div className={styles.mySelectInner}>
                <MySelect title='Select the number of pictures' array={['1', '2', ' 3']} />
                <GenerateImageBtn />
                <MySelect title='Choose the size of the pictures' array={['256x256', '512x512', '1024x1024']} left={-10} />
            </div>
            <Carousel />
        </div>
    );
};

export default CreateImageContent;