import styles from '@assets/styles/Login.module.scss'
import AuthLogin from '@components/ui/AuthLogin/AuthLogin';
import Meta from '@utils/meta/Meta';

const LoginPage: React.FC = () => {
    return (
        <>
            <Meta title='Authorization' />
            <section className={styles.sectionLogin}>
                <AuthLogin />
            </section>
        </>
    );
};

export default LoginPage;