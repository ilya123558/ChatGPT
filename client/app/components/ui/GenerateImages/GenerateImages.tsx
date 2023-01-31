import { useRef } from 'react';
import styles from './GenerateImages.module.scss';
import GenerateImagesItem from '../GenerateImagesItem/GenerateImagesItem';

interface IProps {
    data: string[],
    setToggle: (toggle: boolean) => void
}

const GenerateImages: React.FC<IProps> = ({ data, setToggle }) => {

    const divRef = useRef<HTMLDivElement>(null)

    const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (divRef.current && e.target === divRef.current) {
            setToggle(false)
        }
    }

    return (
        <>
            {data && data.length > 0 &&
                <div className={styles.wrapper} ref={divRef} onClick={click}>
                    <div className={styles.cols}>
                        {
                            data.map((elem, index) => (
                                <GenerateImagesItem url={elem} key={index} />
                            ))
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default GenerateImages;