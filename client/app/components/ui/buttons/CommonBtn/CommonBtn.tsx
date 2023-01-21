import styles from './CommonBtn.module.scss';

interface IProps {
    children: React.ReactNode,
    onClick: () => void,
    text: string
}

const CommonBtn: React.FC<IProps> = ({ children, onClick, text }) => {
    return (
        <button className={styles.btnWrapper} onClick={onClick}>
            {children}
            <p className={styles.text}>{text}</p>
        </button>
    );
};

export default CommonBtn;