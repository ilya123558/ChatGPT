import Image from 'next/image';
import styles from './Carousel.module.scss';
import carouselItemImg1 from '@assets/images/carousel/carouselItemImg1.png'
import carouselItemImg2 from '@assets/images/carousel/carouselItemImg2.png'
import carouselItemImg3 from '@assets/images/carousel/carouselItemImg3.png'
import carouselItemImg4 from '@assets/images/carousel/carouselItemImg4.png'
import carouselItemImg5 from '@assets/images/carousel/carouselItemImg5.png'
import carouselItemImg6 from '@assets/images/carousel/carouselItemImg6.png'
import carouselItemImg7 from '@assets/images/carousel/carouselItemImg7.png'
import { useState } from 'react';

const carouselList: { description: string, url: any }[] = [{
    description: "An abandoned house in the forest is a derelict and deserted building, typically a single-family home, that is located in a wooded area. The house may have been uninhabited for a significant amount of time, and as a result, has fallen into disrepair. The exterior of the house may be overgrown with vegetation, with broken windows and peeling paint. The interior may be similarly dilapidated, with crumbling plaster, fallen ceilings, and debris on the floor. The surrounding forest may have reclaimed parts of the property, making it difficult to access the house. The overall atmosphere of an abandoned house in the forest is eerie and eerie, with a sense of neglect and abandonment. It can be a place where nature has taken over and the man-made structure is being consumed by it.",
    url: carouselItemImg1
},
{
    description: "An island in the ocean with a wooden ship on it is a picturesque and mysterious setting. The island is likely to be a tropical paradise, with white sandy beaches, lush vegetation, and crystal-clear waters. The island is surrounded by the deep blue ocean, and the ship is likely to be a vessel from the past, possibly a sailing ship or a pirate ship. The ship may be partially submerged in the water and is covered with barnacles and seaweed, showing the signs of long-term exposure to the elements. The ship may also be in a state of disrepair, with missing or broken planks, and ragged sails. The island and the ship together create a sense of history and adventure, as if the island was once a hub of activity and the ship was part of it. This island can be a haven for people who love to explore and discover, who can feel the nostalgia and the beauty of nature in one spot.",
    url: carouselItemImg2
},
{
    description: "Travelling on the Milky Way using a warp drive is a journey through space that is faster than the speed of light, which is the theoretical propulsion system that allows one to travel through space faster than the speed of light. The experience of traveling on a warp drive would be a journey through the galaxy, seeing the stars and nebulae of the Milky Way up close, as the ship would be able to bypass the limitations of the speed of light.",
    url: carouselItemImg3
},
{
    description: "A cyberpunk person in the future is an individual who lives in a dystopian, technologically advanced society. They are likely to be part of the counterculture, and may be involved in activities that challenge the status quo and the established power structures. They often have a gritty, edgy aesthetic and may be characterized by their distinctive fashion, which often incorporates elements of punk and cyberpunk culture, such as leather, denim, and neon colors.",
    url: carouselItemImg4
},
{
    description: "A human with cats on his head is an unusual and unusual sight. The human would likely be standing or sitting, with the cats perched on top of their head and possibly spilling over onto their shoulders. The cats would be various sizes and breeds, but all would likely be domestic cats.",
    url: carouselItemImg5
},
{
    description: "A dark forest at night with glowworms is a magical and enchanting place. The trees would be tall, with thick trunks and branches that reach high into the sky. The forest would be dark, with only a small amount of light filtering through the canopy overhead. The air would be cool and damp, and the forest floor would be covered with a thick layer of moss and fallen leaves.",
    url: carouselItemImg6
},
{
    description: "A snowy mountain with an ancient castle on it is a breathtaking and majestic sight. The mountain would be tall and imposing, covered in a thick blanket of snow and ice that glistens in the sunlight. The castle would be perched on the summit, nestled among the rocky crags and cliffs. The castle would be made of grey stone, with towers and turrets that reach high into the sky. The castle would be ancient, with a weathered and worn look, but still standing strong and proud.",
    url: carouselItemImg7
}]

const Carousel: React.FC = () => {

    const [activeIndex, setActiveIndex] = useState(3)
    const [toggle, setToggle] = useState(-1)

    const onClickHandler = (value: string): void => {
        if (value === 'prev') {
            if (activeIndex === 0) {
                setActiveIndex(() => carouselList.length - 3)
                return
            }
            setActiveIndex(prev => prev - 1)
        }
        else {
            if (activeIndex === carouselList.length - 3) {
                setActiveIndex(() => 0)
                return
            }
            setActiveIndex(prev => prev + 1)

        }
    }

    const copyText = (index: number) => {
        const el = document.createElement('textarea');
        el.value = carouselList[index].description;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.carouselInner}>
                <ul className={styles.carousel} style={{ transform: `translate(${-400 * activeIndex}px)` }}>
                    {
                        carouselList.map((elem, index) => (
                            <li
                                key={index}
                                className={styles.carouselItem}
                                onMouseEnter={() => setToggle(() => index)}
                                onMouseLeave={() => setToggle(() => -1)}
                            >
                                <Image className={styles.carouselItemImg} src={elem.url} alt={'titleImg'} />
                                <div className={styles.carouselItemContent}>
                                    <button className={styles.carouselItemBtn} onClick={() => copyText(index)}>Copy Prompts</button>
                                    <p className={styles.carouselItemText}>
                                        {toggle === index ? elem.description : elem.description.split(' ').slice(0, 15).join(' ') + '...'}
                                    </p>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <button className={`${styles.btn} ${styles.prev}`} onClick={() => onClickHandler('prev')}>
                    <svg height="6" width="10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3.912L1.282.218a.756.756 0 0 0-1.062 0 .744.744 0 0 0 0 1.056L4.465 5.49l.003.005c.147.146.34.218.532.218a.751.751 0 0 0 .532-.218c.003-.001.003-.003.004-.005l4.245-4.217a.745.745 0 0 0 0-1.056.756.756 0 0 0-1.062 0L5 3.912z" fillRule="evenodd" fill="white"></path>
                    </svg>
                </button>
                <button className={`${styles.btn} ${styles.next}`} onClick={() => onClickHandler('next')}>
                    <svg height="6" width="10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3.912L1.282.218a.756.756 0 0 0-1.062 0 .744.744 0 0 0 0 1.056L4.465 5.49l.003.005c.147.146.34.218.532.218a.751.751 0 0 0 .532-.218c.003-.001.003-.003.004-.005l4.245-4.217a.745.745 0 0 0 0-1.056.756.756 0 0 0-1.062 0L5 3.912z" fillRule="evenodd" fill="white"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Carousel;








// const [toggleIndex, setToggleIndex] = useState(0)
// const [offset, setOffset] = useState(0)


// useEffect(() => {
//     const interval = setInterval(() => {
//         setToggleIndex(() => {
//             if (toggleIndex === carouselList.length - 3) {
//                 setOffset(0)
//                 return 0
//             }
//             else {
//                 setOffset(offset - 400)
//             }
//             return toggleIndex + 1
//         })

//     }, 5000)

//     return () => clearInterval(interval)


// }, [toggleIndex, offset])

// const onClickHandler = (index: number): void => {
//     setToggleIndex(index)
//     setOffset(-400 * index)
// }