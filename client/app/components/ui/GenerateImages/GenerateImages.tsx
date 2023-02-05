import { useEffect, useRef, useState } from 'react';
import styles from './GenerateImages.module.scss';
import GenerateImagesItem from '../GenerateImagesItem/GenerateImagesItem';

interface IProps {
    data: string[],
    setToggle: (toggle: boolean) => void
}

const GenerateImages: React.FC<IProps> = ({ data, setToggle }) => {

    const divRef = useRef<HTMLDivElement>(null)

    const [width, setWidth] = useState(1920)
    const [activeIndex, setActiveIndex] = useState(0)

    const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (divRef.current && e.target === divRef.current) {
            setToggle(false)
        }
    }

    const onClickHandler = (value: string): void => {
        if (value === 'prev') {
            if (activeIndex === 0) {
                setActiveIndex(() => data.length - 1)
                return
            }
            setActiveIndex(prev => prev - 1)
        }
        else {
            if (activeIndex === data.length - 1) {
                setActiveIndex(() => 0)
                return
            }
            setActiveIndex(prev => prev + 1)
        }
    }

    useEffect(() => {
        divRef.current?.offsetWidth && setWidth(divRef.current.offsetWidth)
    }, [divRef.current?.offsetWidth])


    return (
        <>
            {data && data.length > 0 &&
                <div className={styles.wrapper} ref={divRef} onClick={click}>
                    {width <= 500
                        ?
                        <div className={styles.colsMobile}>
                            <div className={styles.generateImagesItemInner} style={
                                { transform: `translate(${-(29 * activeIndex) + (data.length === 3 ? 29 : (data.length === 2 ? (29 / 4 * 2) : 0))}em)` }
                            }>
                                {
                                    data.map((elem, index) => (
                                        <GenerateImagesItem url={elem} key={index} />
                                    ))
                                }
                            </div>

                            {data && data.length !== 1 &&
                                <>
                                    <button className={`${styles.btn} ${styles.prev}`} onClick={() => onClickHandler('prev')}>
                                        <svg xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 3.912L1.282.218a.756.756 0 0 0-1.062 0 .744.744 0 0 0 0 1.056L4.465 5.49l.003.005c.147.146.34.218.532.218a.751.751 0 0 0 .532-.218c.003-.001.003-.003.004-.005l4.245-4.217a.745.745 0 0 0 0-1.056.756.756 0 0 0-1.062 0L5 3.912z" fillRule="evenodd" fill="white"></path>
                                        </svg>
                                    </button>
                                    <button className={`${styles.btn} ${styles.next}`} onClick={() => onClickHandler('next')}>
                                        <svg xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 3.912L1.282.218a.756.756 0 0 0-1.062 0 .744.744 0 0 0 0 1.056L4.465 5.49l.003.005c.147.146.34.218.532.218a.751.751 0 0 0 .532-.218c.003-.001.003-.003.004-.005l4.245-4.217a.745.745 0 0 0 0-1.056.756.756 0 0 0-1.062 0L5 3.912z" fillRule="evenodd" fill="white"></path>
                                        </svg>
                                    </button>
                                </>
                            }
                        </div>
                        :
                        <div className={styles.cols}>
                            {
                                data.map((elem, index) => (
                                    <GenerateImagesItem url={elem} key={index} />
                                ))
                            }
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default GenerateImages;