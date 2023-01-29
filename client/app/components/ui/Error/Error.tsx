import styles from './Error.module.scss';

const Error: React.FC = () => {
    return (
        <div className={styles.errorWrapper}>
            <div className={styles.error}>Лови Error в ебало</div>
        </div>
    );
};

export default Error;