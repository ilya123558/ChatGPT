import styles from './LoginBtn.module.scss';

interface IProps {
    onClick: () => void
}

const LoginBtn: React.FC<IProps> = ({ onClick }) => {

    return (
        <button
            className={styles.loginBtn}
            onClick={onClick}>
            Sign in
        </button>
    );
};

export default LoginBtn;