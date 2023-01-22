import styles from './LoadingWriteMessage.module.scss';

const LoadingWriteMessage: React.FC = () => {
    return (
        <div className={styles.loadingWriteMessage}>
            <div className={styles.point1}></div>
            <div className={styles.point2}></div>
            <div className={styles.point3}></div>
        </div>
    );
};

export default LoadingWriteMessage;