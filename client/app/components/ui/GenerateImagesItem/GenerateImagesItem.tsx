import DownloadBtn from '../buttons/DownloadBtn/DownloadBtn';
import styles from './GenerateImagesItem.module.scss';

const GenerateImagesItem: React.FC<{url: string}> = ({url}) => {
    return (
        <div className={styles.col}>
            <div className={styles.container}>
                <div className={styles.front}>
                    <img src={url} alt="bgImg" />
                </div>
                <div className={styles.back} >
                    <div className={styles.inner}>
                        <p>Сheck the photo</p>
                        <span>To download it</span>
                        <div className={styles.btnInner}>
                            <DownloadBtn url={url} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateImagesItem;