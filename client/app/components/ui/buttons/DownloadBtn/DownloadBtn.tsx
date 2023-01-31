import { useEffect, useState } from 'react';
import styles from './DownloadBtn.module.scss';

interface IProps {
    url: string,
}

const DownloadBtn: React.FC<IProps> = ({ url }) => {

    const [isHover, setIsHover] = useState(false)
    const [isDownload, setIsDownload] = useState(false)

    const onClickHandler = () => {
        setIsDownload(!isDownload)
        handleClick()
    }

    const onHover = () => {
        setIsHover(prev => !prev)
    }

    const onHoverLeave = () => {
        setIsHover(prev => !prev)
    }

    const handleClick = () => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (isDownload) {
            setTimeout(() => {
                setIsDownload(prev => !prev)
            }, 2000)
        }
    }, [isDownload])

    return (
        <button
            className={styles.downloadBtn}
            onClick={onClickHandler}
            style={{ backgroundColor: isDownload ? '#2AC06A' : '#4D31F3' }}
            onMouseEnter={onHover}
            onMouseLeave={onHoverLeave}
        >
            <div className={styles.svgListWrapper}>
                <ul className={styles.svgList} style={{ transform: `translateY(${isHover ? 0 : (!isDownload ? -49 : 0)}px)` }}>
                    <li className={styles.svgItem}>
                        <svg style={{ color: "white" }} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path>
                        </svg>
                    </li>
                    <li className={styles.svgItem}>
                        <svg style={{ color: "white" }} className={styles.arrow} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" fill="white"></path>
                        </svg>
                    </li>

                </ul>
            </div>
            <div className={styles.textListWrapper}>
                <ul className={styles.textList} style={{ transform: `translateY(${isDownload ? -30 : 0}px)` }}>
                    <li className={styles.textItem}>
                        Download
                    </li>
                    <li className={styles.textItem}>
                        Success
                    </li>
                </ul>
            </div>
        </button>
    );
};

export default DownloadBtn;