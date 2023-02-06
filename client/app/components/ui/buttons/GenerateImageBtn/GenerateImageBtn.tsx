import styles from './GenerateImageBtn.module.scss';

const GenerateImageBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {

    return (
        <button className={styles.generateImageBtn} onClick={onClick}>
            Generate
            <span className={styles.line + ' ' + styles.line_top}></span>
            <span className={styles.line + ' ' + styles.line_right}></span>
            <span className={styles.line + ' ' + styles.line_bottom}></span>
            <span className={styles.line + ' ' + styles.line_left}></span>
        </button>
    );
};

export default GenerateImageBtn;