import { useEffect, useState } from 'react';
import styles from './Cub.module.scss';

const Cub: React.FC = () => {

    const [rotate, setRotate] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setRotate(prev => prev + 1)
        }, 20)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.cub} style={{ transform: `rotateX(${rotate}deg) rotateY(${rotate}deg) rotateZ(${rotate * 2}deg)` }}>
                <div className={styles.side + ' ' + styles.front}>
                    <p>loading</p>
                </div>
                <div className={styles.side + ' ' + styles.back}>
                    <p>loading</p>
                </div>
                <div className={styles.side + ' ' + styles.left}>
                    <p>loading</p>
                </div>
                <div className={styles.side + ' ' + styles.right}>
                    <p>loading</p>
                </div>
                <div className={styles.side + ' ' + styles.top}>
                    <p>loading</p>
                </div>
                <div className={styles.side + ' ' + styles.bottom}>
                    <p>loading</p>
                </div>
            </div>
        </div>
    );
};

export default Cub;