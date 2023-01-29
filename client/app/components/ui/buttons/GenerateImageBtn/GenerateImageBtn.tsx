import styles from './GenerateImageBtn.module.scss';

const GenerateImageBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button className={styles.generateImageBtn} onClick={onClick}>
            Generate
        </button>
    );
};

export default GenerateImageBtn;