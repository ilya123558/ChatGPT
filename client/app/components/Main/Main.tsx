import DialogWindow from '@components/DialogWindow/DialogWindow';
import Sidebar from '@components/Sidebar/Sidebar';
import styles from './Main.module.scss';

const Main: React.FC = () => {
    return (
        <section className={styles.main}>
            <Sidebar />
            <DialogWindow />
        </section>
    );
};

export default Main;