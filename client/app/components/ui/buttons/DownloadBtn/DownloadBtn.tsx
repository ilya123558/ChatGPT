import { useEffect, useState } from 'react';
import styles from './DownloadBtn.module.scss';

interface IProps {
    url: string,
}

const DownloadBtn: React.FC<IProps> = ({ url }) => {

    const [isDownload, setIsDownload] = useState(false)

    const onClickHandler = async () => {
        await setIsDownload(!isDownload)
        await setTimeout(() => {
            handleClick()
        }, 2000)
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
        >
            <div className={styles.textListWrapper}>
                <ul className={styles.textList} style={{ transform: `translateY(${isDownload ? -3.6 : 0}em)` }}>
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