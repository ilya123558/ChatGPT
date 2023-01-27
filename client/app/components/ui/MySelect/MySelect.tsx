import { useState } from 'react';
import styles from './MySelect.module.scss'

interface IProps {
    array: string[],
    title: string,
    left?: number
}

const MySelect: React.FC<IProps> = ({ array, title, left }) => {


    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className={styles.wrapper} style={{ maxWidth: 60 * array.length }}>
            <h3 className={styles.title}>{title}</h3>
            <ul className={styles.list}>
                {
                    array.map((elem, index) => (
                        <li key={index} className={styles.listItem}>
                            <div
                                className={styles.stick + ' ' + (activeIndex === index ? styles.itemActive : styles.item)}
                                onClick={() => setActiveIndex(() => index)}
                                style={{ marginRight: index === array.length - 1 ? 0 : 30 }}
                            ></div>
                            <p className={styles.text} style={{ left: left? left: 11 }}>{elem}</p>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.decorCercle} style={{ left: activeIndex ? 60 * activeIndex + 18 : 18 }}></div>
        </div>
    );
};

export default MySelect;