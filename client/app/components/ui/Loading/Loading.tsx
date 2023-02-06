import styles from './Loading.module.scss';
import Cub from '../Cub/Cub';


const Loading: React.FC = () => {

    return (
        <div className={styles.loadingWrapper}>
            <Cub />
        </div>
    );
};

export default Loading;