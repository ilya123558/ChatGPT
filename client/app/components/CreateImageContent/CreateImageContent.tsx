import GenerateImageBtn from '@components/ui/buttons/GenerateImageBtn/GenerateImageBtn';
import Carousel from '@components/ui/Carousel/Carousel';
import Error from '@components/ui/Error/Error';
import MySelect from '@components/ui/MySelect/MySelect';
import ResponseImageContent from '@components/ui/ResponseImageContent/ResponseImageContent';
import ResponseImageLoading from '@components/ui/ResponseImageLoading/ResponseImageLoading';
import { useCreateImagesMutation } from '@services/ImageService.api';
import React, { useEffect, useState } from 'react';
import styles from './CreateImageContent.module.scss';

const arrayCountPictures = ['1', '2', '3']
const arraySizePicturesIndex = ['256x256', '512x512', '1024x1024']

const CreateImageContent: React.FC = () => {

    const [createImages, { data, isLoading, error }] = useCreateImagesMutation()

    const [counter, setCounter] = useState(200);
    const [toggle, setToggle] = useState(false)

    const [value, setValue] = useState('')
    const [countPicturesIndex, setCountPicturesIndex] = useState(0)
    const [sizePicturesIndex, setSizePicturesIndex] = useState(0)
    const [isError, setIsError] = useState(false)

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => event.target.value)
        setCounter(event.target.value.length * 4);
        if (event.target.value.length === 0) {
            setCounter(100);
        }
    }

    const onClickHandler = async () => {
        await createImages({
            prompt: value,
            n: Number(arrayCountPictures[countPicturesIndex]),
            size: arraySizePicturesIndex[sizePicturesIndex]
        })

        setValue('')
        setCountPicturesIndex(0)
        setSizePicturesIndex(0)
    }

    useEffect(() => {
        if (data && !isLoading) {
            setToggle(true)
        }
    }, [data, isLoading])

    useEffect(() => {
        if (error) {
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, 4000)
        }
    }, [error])


    return (
        <div className={styles.wrapper}>
            {isLoading && <ResponseImageLoading />}
            {toggle && !isLoading && !error && <ResponseImageContent data={data} setToggle={setToggle} />}
            {isError && <Error />}
            <h1 className={styles.title}>Creating Illusions of Reality:  <br /> The Power of AI image Generation</h1>
            <p className={styles.text}>
                Transforming words into art in seconds with AI Image generator.
            </p>
            <div className={styles.inputInner}>
                <input
                    className={styles.input}
                    onChange={onChangeHandler}
                    placeholder="Describe what you want to see with phrases and let AI do the rest"
                    value={value}
                />
                <span className={styles.underline} style={{ width: `${counter}%` }}></span>
            </div>
            <div className={styles.mySelectInner}>
                <MySelect
                    title='Select the number of pictures'
                    array={arrayCountPictures}
                    activeIndex={countPicturesIndex}
                    setActiveIndex={setCountPicturesIndex}
                />
                <GenerateImageBtn onClick={onClickHandler} />
                <MySelect
                    title='Choose the size of the pictures'
                    array={arraySizePicturesIndex}
                    left={-10}
                    activeIndex={sizePicturesIndex}
                    setActiveIndex={setSizePicturesIndex}
                />
            </div>
            <Carousel />
        </div>
    );
};

export default CreateImageContent;