import GenerateImageBtn from '@components/ui/buttons/GenerateImageBtn/GenerateImageBtn';
import Carousel from '@components/ui/Carousel/Carousel';
import Error from '@components/ui/Error/Error';
import MySelect from '@components/ui/MySelect/MySelect';
import GenerateImages from '@components/ui/GenerateImages/GenerateImages';
import { useCreateImagesMutation } from '@services/ImageService.api';
import React, { useEffect, useRef, useState } from 'react';
import styles from './CreateImageContent.module.scss';
import { useAppDispatch } from '@hooks/redux';
import { setLoading } from 'slices/MainSlice';

const arrayCountPictures = ['1', '2', '3']
const arraySizePicturesIndex = ['256x256', '512x512', '1024x1024']

const CreateImageContent: React.FC = () => {

    const dispatch = useAppDispatch()

    const ref = useRef<HTMLDivElement>(null)
    const refTextarea = useRef<HTMLTextAreaElement>(null)

    const [createImages, { data, isLoading, error }] = useCreateImagesMutation()

    const [toggle, setToggle] = useState(false)
    const [countPicturesIndex, setCountPicturesIndex] = useState(0)
    const [sizePicturesIndex, setSizePicturesIndex] = useState(0)
    const [isError, setIsError] = useState(false)

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (refTextarea.current) {
            refTextarea.current.value = event.target.value;
        }
    }

    const onClickHandler = async () => {
        await createImages({
            prompt: refTextarea.current? refTextarea.current.value: '',
            n: Number(arrayCountPictures[countPicturesIndex]),
            size: arraySizePicturesIndex[sizePicturesIndex]
        })
    }

    useEffect(() => {
        if (data && !isLoading) {
            setToggle(true)
        }
        dispatch(setLoading(isLoading))
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
        <div ref={ref} className={styles.wrapper}>
            {toggle && !isLoading && !error && <GenerateImages data={data} setToggle={setToggle} />}
            {isError && <Error />}

            <div className={styles.innerContent}>
                <h1 className={styles.title}>Creating Illusions of Reality:  <br /> The Power of AI image Generation</h1>
                <p className={styles.text}>
                    Transforming words into art in seconds with AI Image generator.
                </p>
                <div className={styles.textareaInner}>
                    <textarea
                        ref={refTextarea}
                        className={styles.textarea}
                        onChange={onChangeHandler}
                        placeholder="Describe what you want to see with phrases and let AI do the rest"
                    />
                    <span className={styles.underline} style={{ width: `100%` }}></span>
                </div>
                <div className={styles.mySelectInner}>
                    <MySelect
                        title='Select the number of the pictures'
                        array={arrayCountPictures}
                        activeIndex={countPicturesIndex}
                        setActiveIndex={setCountPicturesIndex}
                    />
                    {ref.current && ref.current?.offsetWidth > 500 && <GenerateImageBtn onClick={onClickHandler} />}
                    <MySelect
                        title='Choose the size of the pictures'
                        array={arraySizePicturesIndex}
                        left={-0.625}
                        activeIndex={sizePicturesIndex}
                        setActiveIndex={setSizePicturesIndex}
                    />
                </div>
                {ref.current && ref.current?.offsetWidth <= 500 && <GenerateImageBtn onClick={onClickHandler} />}
            </div>
            <Carousel />
        </div>
    );
};

export default CreateImageContent;