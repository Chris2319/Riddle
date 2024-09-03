import './App.scss';
import jsonData from './data.json';
import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import jupiterImage from './assets/jupiter+nasa+photo.jpg';
import orionImage from './assets/Orion.jpg';
import earthImage from './assets/earth.jpg';
import leoImage from './assets/Leo.jpg';
import saturnImage from './assets/saturn.jpg';
import betelgeuseImage from './assets/beetle.webp';
import ioImage from './assets/Io.jpg';
import titanImage from './assets/Titan.jpeg';
import cometImage from './assets/comet.webp';
import hubbleImage from './assets/hubble.jpeg';
import eclipseImage from './assets/Eclipse.jpg';
import sunImage from './assets/sun.jpg';
import thugLifeImage from './assets/thugLife.png';
import thugLifeCapImage from './assets/thugLifeCap.png';
import thugLifeJointImage from './assets/thugLifeJoint.png';
import joelImage from './assets/Joel-Scholten-1280x1280.webp';

import AgnieszkaImage from './assets/bitches/Agnieszka-Cwienczek-1280x1280.webp';
import AnhImage from './assets/bitches/Anh-Duc-Nguyen-1280x1325.webp';
import ClemensImage from './assets/bitches/Clemens-Florian-1280x1280.webp';
import CodrinImage from './assets/bitches/Codrin-400x400-1.jpg';
import CoenImage from './assets/bitches/Coen-2-lageResolutie-400x400-1.jpg';
import DennisImage from './assets/bitches/Dennis-01-LageResolutie-1-400x400-1.jpg';
import EvaImage from './assets/bitches/Eva-ter-Wielen-1280x1280.webp';
import FerranImage from './assets/bitches/Ferran-Tombal-1280x1401.webp';
import JelleImage from './assets/bitches/Jelle-Kalshoven-1280x1280.webp';
import KevinImage from './assets/bitches/Kevin-van-Rijn-1280x1280.webp';
import LeonImage from './assets/bitches/Leon-Elshof-1280x1354.webp';
import MarkImage from './assets/bitches/Mark-Leck-1280x1257.webp';
import NilsImage from './assets/bitches/Nils-van-Gestel-1280x1363.webp';
import SkipImage from './assets/bitches/Skip-van-der-Meer-1280x1440.webp';
import YvorImage from './assets/bitches/Yvor-van-den-Beuken-1280x1370.webp';
import DucoImage from './assets/bitches/Duco-van-der-Kooij-1280x1288.webp';
import DucImage from './assets/bitches/Duc-Janssen-1280x1280.webp';
import EdwinImage from './assets/bitches/Edwin-Lodder-1280x1353.webp';
import ErwinImage from './assets/bitches/Erwin-Beumber-1280x1287.webp';
import JordyImage from './assets/bitches/Jordy-de-Jong-1280x1280.webp';
import Kateryna from './assets/bitches/Kateryna-Hordynska-1280x1282.webp';
import HandImage from './assets/bitches/Cartoon-hand-,-cute-arm-in-white-glove-on-transparent-background-PNG.png';

const bitchesImages = [
    AgnieszkaImage,
    AnhImage,
    ClemensImage,
    CodrinImage,
    CoenImage,
    DennisImage,
    EvaImage,
    FerranImage,
    DucoImage,
    DucImage,
    EdwinImage,
]

const bitchesImages2 = [
    JelleImage,
    KevinImage,
    LeonImage,
    MarkImage,
    NilsImage,
    SkipImage,
    YvorImage,
    Kateryna,
    JordyImage,
    ErwinImage,
]

interface QuizQuestion {
    question: string;
    hints: string[];
    answer: string;
}

interface QuizData {
    quiz: QuizQuestion[];
}

interface Answers {
    Jupiter: string;
    Orion: string;
    Earth: string;
    Leo: string;
    Saturn: string;
    Betelgeuse: string;
    Io: string;
    Titan: string;
    Comet: string;
    Hubble: string;
    Eclipse: string;
    Sun: string;
}

const correctAnswers = [
    'Jupiter',
    'Orion',
    'Earth',
    'Leo',
    'Saturn',
    'Betelgeuse',
    'Io',
    'Titan',
    'Comet',
    'Hubble',
    'Eclipse',
    'Sun',
];
const emptyAnswers = {
    'Jupiter': '',
    'Orion': '',
    'Earth': '',
    'Leo': '',
    'Saturn': '',
    'Betelgeuse': '',
    'Io': '',
    'Titan': '',
    'Comet': '',
    'Hubble': '',
    'Eclipse': '',
    'Sun': ''
};
const answerImages = {
    'Jupiter': jupiterImage,
    'Orion': orionImage,
    'Earth': earthImage,
    'Leo': leoImage,
    'Saturn': saturnImage,
    'Betelgeuse': betelgeuseImage,
    'Io': ioImage,
    'Titan': titanImage,
    'Comet': cometImage,
    'Hubble': hubbleImage,
    'Eclipse': eclipseImage,
    'Sun': sunImage
};

function App() {
    // State
    const [data] = useState<QuizData>(jsonData as QuizData);
    const [answers, setAnswers] = useState<Answers>(emptyAnswers);
    const [activeItem, setActiveItem] = useState<QuizQuestion>({answer: 'Jupiter',} as QuizQuestion);
    const [areAnswersCorrect, setAreAnswersCorrect] = useState<boolean>(false);
    const [showCards, setShowCards] = useState<boolean>(false);

    // Framer motion
    const vCard = {
        visible: {opacity: 1, transition: {duration: 2}},
        hidden: {opacity: 0, transition: {duration: 2}},
    };
    const vLi = {
        visible: {opacity: 1, x: 0},
        hidden: {opacity: 1, x: '-150%'},
    };
    const vUl = {
        visible: {transition: {duration: 2, staggerChildren: 0.2}},
        hidden: {transition: {duration: 2, staggerChildren: 0.2}},
    };

    const vThug = {
        visible: {scale: 1, transition: {duration: 2, delay: 2}},
        hidden: {scale: 0, transition: {duration: 2, delay: 2}},
    };
    const vThugCap = {
        visible: {x: 0, transition: {duration: 2, delay: 2}},
        hidden: {x: '-120vh', transition: {duration: 2, delay: 2}},
    };
    const vThugGlasses = {
        visible: {x: 0, transition: {duration: 2, delay: 2}},
        hidden: {x: '120vh', transition: {duration: 2, delay: 2}},
    };
    const vThugJoint = {
        visible: {y: 0, rotateY: 180, transition: {duration: 2, delay: 2}},
        hidden: {y: '120vh', rotateY: 0, transition: {duration: 2, delay: 2}},
    };

    // Effects
    useEffect(() => {
        const userAnswers = Object.values(answers);

        const allCorrect = correctAnswers.every((correctAnswer, index) =>
            correctAnswer.toLowerCase() === userAnswers[index].toLowerCase()
        );
        if (allCorrect) {
            setTimeout(() => {
                setAreAnswersCorrect(true);
            }, 500);
        } else {
            setAreAnswersCorrect(false);
        }

    }, [answers]);

    const handleOnChange = (val: string, ans: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [ans]: val
        }));
    };

    const handleCorrect = (item: QuizQuestion, index: number): boolean => {
        return answers?.[item.answer as keyof typeof answers]?.toLowerCase() === correctAnswers[index]?.toLowerCase();
    };

    const getStylePerImage = (item: QuizQuestion) => {
        const style = {
            backgroundImage: `url(${answerImages[item.answer as keyof typeof answerImages]})`,
            backgroundPosition: 'center bottom',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transition: 'all 800ms ease-in-out',
            transformOrigin: '60% 80%'
        };
        switch (item.answer) {
            case 'Jupiter':
                style.backgroundPosition = '10rem 5rem';
                break;
            case 'Orion':
                style.transformOrigin = '50% 50%'
                break;
            case 'Earth':
                style.backgroundPosition = '0 10rem';
                style.transformOrigin = '50% 80%'
                break;
            case 'Leo':
                style.transformOrigin = '50% 50%'
                break;
            case 'Saturn':
                style.backgroundPosition = 'center bottom';
                style.backgroundSize = '110%';
                break;
            case 'Betelgeuse':
                style.backgroundPosition = 'center 5rem';
                break;
            case 'Io':
                style.backgroundPosition = '1rem 10rem';
                style.backgroundSize = '150%';
                style.transformOrigin = '100% 50%'
                break;
            case 'Titan':
                style.backgroundPosition = 'center 10rem';
                break;
            case 'Comet':
                style.backgroundPosition = 'center -2rem';
                style.backgroundSize = '150%';
                style.transformOrigin = '50% 100%'
                break;
            case 'Hubble':
                style.transformOrigin = '50% 0'
                break;
            case 'Eclipse':
                style.transformOrigin = '50% 0'
                break;
        }
        return style;
    }

    const removeBlur = (item: QuizQuestion): boolean => {
        const index = correctAnswers.findIndex((a) => a === activeItem.answer);
        return index > -1 && item.answer === activeItem.answer && answers[activeItem?.answer as keyof typeof answers]?.toLowerCase() === correctAnswers[index]?.toLowerCase();
    };

    const isLocalhost = (): boolean => {
        const hostname = window.location.hostname;
        return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'; // IPv6 localhost
    }

    return (
        <div className={'wrapper'}>
            <AnimatePresence>
                {
                    isLocalhost() &&
                    <button onClick={() => setAnswers({
                        'Jupiter': 'Jupiter',
                        'Orion': 'Orion',
                        'Earth': 'Earth',
                        'Leo': 'Leo',
                        'Saturn': 'Saturn',
                        'Betelgeuse': 'Betelgeuse',
                        'Io': 'Io',
                        'Titan': 'Titan',
                        'Comet': 'Comet',
                        'Hubble': 'Hubble',
                        'Eclipse': 'Eclipse',
                        'Sun': 'Sun'
                    })}>correct all
                    </button>
                }
                {areAnswersCorrect && <button onClick={() => setShowCards(!showCards)}>Toggle cards</button>}

                <div className={'background '}>
                    {
                        areAnswersCorrect && <div className={'finalAnswer'}>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'J'}>J</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'O'}>O</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'E'}>E</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'L'}>L</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'S'}>S</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}}>&nbsp;</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'B'}>B</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'I'}>I</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'T'}>T</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'C'}>C</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'H'}>H</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'E2'}>E</motion.div>
                            <motion.div transition={{duration: 2, delay: 1}} layoutId={'S2'}>S</motion.div>
                        </div>
                    }
                    {
                        areAnswersCorrect &&
                        <div className={'thug'}>
                            <motion.div className={'cap'} style={{
                                backgroundImage: `url(${thugLifeCapImage})`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }} initial={'hidden'} variants={vThugCap} animate={'visible'}
                            ></motion.div>
                            <motion.div className={'glasses'} style={{
                                backgroundImage: `url(${thugLifeImage})`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }} initial={'hidden'} variants={vThugGlasses} animate={'visible'}
                            ></motion.div>
                            <motion.div className={'joint'} style={{
                                backgroundImage: `url(${thugLifeJointImage})`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }} initial={'hidden'} variants={vThugJoint} animate={'visible'}
                            ></motion.div>
                            <motion.div className={'joel'} style={{
                                backgroundImage: `url(${joelImage})`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }} initial={'hidden'} variants={vThug} animate={'visible'}
                            ></motion.div>
                        </div>
                    }
                    {
                        areAnswersCorrect &&
                        <div className={'bitches'}>
                            <div className={'row'}>
                                {
                                    bitchesImages.map((image) => (
                                        <motion.div key={image}
                                                    initial={{opacity: 0, x: '-100vw'}}
                                                    animate={{opacity: 1, x: 0, y: [0, -20, 0]}}
                                                    exit={{opacity: 0}}
                                                    transition={{
                                                        x: {duration: 1, ease: "easeOut"}, // Slide-in transition
                                                        y: {
                                                            duration: 2, // Duration of the up and down animation
                                                            delay: Math.random() * 2 + 1,
                                                            repeat: Infinity, // Repeat infinitely
                                                            repeatType: "loop", // Loop the up and down animation
                                                            ease: "easeInOut", // Easing for up and down animation
                                                        },
                                                    }}
                                                    style={{
                                                        backgroundImage: `url(${image})`,
                                                        backgroundPosition: 'center center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}>

                                            <div
                                                className={'hand1'}
                                                style={{
                                                    backgroundImage: `url(${HandImage})`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}></div>
                                            <div
                                                className={'hand2'}
                                                style={{
                                                    backgroundImage: `url(${HandImage})`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}></div>

                                        </motion.div>
                                    ))
                                }
                            </div>
                            <div className={'row'}>
                                {
                                    bitchesImages2.map((image) => (
                                        <motion.div key={image}
                                                    initial={{opacity: 0, x: '100vw'}}
                                                    animate={{opacity: 1, x: 0, y: [0, -20, 0]}}
                                                    exit={{opacity: 0}}
                                                    transition={{
                                                        x: {duration: 1, ease: "easeOut"}, // Slide-in transition
                                                        y: {
                                                            duration: 2, // Duration of the up and down animation
                                                            delay: Math.random() * 2 + 1,
                                                            repeat: Infinity, // Repeat infinitely
                                                            repeatType: "loop", // Loop the up and down animation
                                                            ease: "easeInOut", // Easing for up and down animation
                                                        },
                                                    }}
                                                    style={{
                                                        backgroundImage: `url(${image})`,
                                                        backgroundPosition: 'center center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}>

                                            <div
                                                className={'hand1'}
                                                style={{
                                                    backgroundImage: `url(${HandImage})`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}></div>
                                            <div
                                                className={'hand2'}
                                                style={{
                                                    backgroundImage: `url(${HandImage})`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}></div>

                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                    {/*{*/}
                    {/*    playAudio &&*/}
                    {/*    <audio autoPlay={true} controls>*/}
                    {/*        <source src={song} type="audio/mp3"/>*/}
                    {/*    </audio>*/}
                    {/*}*/}
                </div>

                {
                    data.quiz.map((item: QuizQuestion, index: number) => (
                        <motion.div
                            onMouseEnter={() => setActiveItem(item)}
                            onMouseLeave={() => setActiveItem({} as QuizQuestion)}
                            initial={vCard.hidden}
                            animate={areAnswersCorrect && !showCards ? vCard.hidden : vCard.visible}
                            key={item.answer}
                            className={`card ${removeBlur(item) ? 'card--noBlur' : ''}`}

                        >
                            <div className={'card__image'} style={getStylePerImage(item)}></div>
                            <h3 className={'question'}>{item.question}</h3>

                            {
                                handleCorrect(item, index) ?
                                    <div
                                        className={'answer'}>{item.answer.split('').map((l: string, li: number) =>
                                        li === 0 ? (areAnswersCorrect ? <h3>{l.toUpperCase()}</h3> :
                                                <motion.h3 transition={{duration: 2, delay: 1}}
                                                           layoutId={(index === 10 || index === 11 || index === 12) ? l.toUpperCase() + '2' : l.toUpperCase()}>{l}</motion.h3>) :
                                            <h3>{l}</h3>)}</div> : <input
                                        className={handleCorrect(item, index) ? 'input--correct' : 'input--wrong'}
                                        placeholder={'?'.repeat(item.answer.length)}
                                        disabled={handleCorrect(item, index)}
                                        value={answers[item.answer as keyof typeof answers]}
                                        onChange={(e) => handleOnChange(e.target.value, item.answer)}/>
                            }

                            <motion.ul variants={vUl} initial={'hidden'}
                                       animate={removeBlur(item) ? 'hidden' : 'visible'}>
                                {item.hints.map((hint: string, hIndex: number) => (
                                    <motion.li
                                        variants={vLi}
                                        initial={'visible'}
                                        animate={removeBlur(item) ? 'hidden' : 'visible'}
                                        transition={{delay: 0.2 * hIndex, duration: 0.8}}
                                        key={hint}>{hint}</motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div>
    );
}

export default App;
