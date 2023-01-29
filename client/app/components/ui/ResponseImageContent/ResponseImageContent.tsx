import { useEffect, useRef, useState } from 'react';
import styles from './ResponseImageContent.module.scss';
import DownloadBtn from '@components/ui/buttons/DownloadBtn/DownloadBtn'

interface IProps {
    data: string[]
}

const ResponseImageContent: React.FC<IProps> = ({ data }) => {

    const divRef = useRef<HTMLDivElement>(null)

    const [dataArray, setDataArray] = useState<{ url: string, toggle: boolean }[]>(data.map(elem => ({
        url: elem,
        toggle: true
    })))
    const [urls, setUrls] = useState<string[]>([])
    const [isDownload, setIsDownload] = useState(true)
    const [visible, setVisible] = useState(true)

    const onClickHandler = (index: number) => {
        setDataArray(prev => prev.map((elem, elemIndex) => {
            if (index === elemIndex) {
                return { ...elem, toggle: !elem.toggle }
            }
            return elem
        }))
    }

    const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (divRef.current && e.target === divRef.current) {
            setVisible(!visible)
        }
    }

    useEffect(() => {
        if (!isDownload) {
            setTimeout(() => {
                setVisible(!visible)
            }, 2000);
        }
    }, [isDownload])

    useEffect(() => {
        const array = dataArray.filter((elem) => elem.toggle).map(elem => elem.url)
        setUrls([...array])
    }, [dataArray])

    return (
        <>
            {visible &&
                <div className={styles.responseImageContent} ref={divRef} onClick={click}>
                    <div className={styles.wrapper}>
                        <div className={styles.cols}>
                            {
                                data.map((elem, index) => (
                                    <div className={styles.col} key={index}>
                                        <div className={styles.container}>
                                            <div className={styles.front}>
                                                <img src={elem} alt="bgImg" />
                                                {dataArray[index].toggle ?
                                                    <svg className={styles.check} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" fill="#46f339"></path>
                                                    </svg>
                                                    :
                                                    <svg style={{ color: "red" }} className={styles.check} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill="red" ></path>
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="red" ></path>
                                                    </svg>
                                                }
                                            </div>
                                            <div className={styles.back} >
                                                <div className={styles.inner}>
                                                    <p>Сheck the photo</p>
                                                    <span>To download it</span>
                                                    <button className={styles.btn} onClick={() => onClickHandler(index)}>
                                                        <div className={styles.btnCircle}
                                                            style={{ right: dataArray[index].toggle ? 36 : 3, backgroundColor: dataArray[index].toggle ? 'green' : 'rgb(160, 41, 41)' }}>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <DownloadBtn urls={urls} isDownload={isDownload} setIsDownload={setIsDownload} />
                </div>
            }
        </>

    );
};

export default ResponseImageContent;