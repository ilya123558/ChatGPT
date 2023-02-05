import { useState } from 'react';
import styles from './MySelect.module.scss'

interface IProps {
    array: string[],
    title: string,
    left?: number,
    activeIndex: number,
    setActiveIndex: (activeIndex: number) => void
}

const MySelect: React.FC<IProps> = ({ array, title, left, activeIndex, setActiveIndex }) => {


    return (
        <div className={styles.wrapper} style={{ maxWidth: 3.75 * array.length + 'em' }}>
            <h3 className={styles.title}>{title}</h3>
            <ul className={styles.list}>
                {
                    array.map((elem, index) => (
                        <li key={index} className={styles.listItem}>
                            <div
                                className={styles.stick + ' ' + (activeIndex === index ? styles.itemActive : styles.item)}
                                onClick={() => setActiveIndex(index)}
                                style={{ marginRight: index === array.length - 1 ? '0em' : `1.875em` }}
                            ></div>
                            <p className={styles.text} style={{ left: left ? left + 'em' : '0.6875em' }}>{elem}</p>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.decorCercle} style={{ left: activeIndex ? (3.75 * activeIndex + 1.125) + 'em' : '1.125em' }}></div>
        </div>
    );
};

export default MySelect;