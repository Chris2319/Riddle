import './App.scss';
import jsonData from './data.json';
import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import jupiterImage from './assets/jupiter+nasa+photo.jpg';
import orionImage from './assets/Orion.jpg';
import europaImage from './assets/Europa.webp';
import lagrangeImage from './assets/Lagrange.jpg';
import saturnImage from './assets/saturn.jpg';
import betelgeuseImage from './assets/beetle.webp';
import ioImage from './assets/Io.jpg';
import titanImage from './assets/Titan.jpeg';
import callistoImage from './assets/Callisto.jpg';
import hubbleImage from './assets/hubble.jpeg';
import enceladusImage from './assets/Enceladus.jpg';
import sunImage from './assets/sun.jpg';
import Spline from '@splinetool/react-spline';

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
    Europa: string;
    Lagrange: string;
    Saturn: string;
    Betelgeuse: string;
    Io: string;
    Titan: string;
    Callisto: string;
    Hubble: string;
    Enceladus: string;
    Sun: string;
}

const correctAnswers = [
    'Jupiter',
    'Orion',
    'Europa',
    'Lagrange',
    'Saturn',
    'Betelgeuse',
    'Io',
    'Titan',
    'Callisto',
    'Hubble',
    'Enceladus',
    'Sun',
];
const emptyAnswers = {
    'Jupiter': '',
    'Orion': '',
    'Europa': '',
    'Lagrange': '',
    'Saturn': '',
    'Betelgeuse': '',
    'Io': '',
    'Titan': '',
    'Callisto': '',
    'Hubble': '',
    'Enceladus': '',
    'Sun': ''
};
const answerImages = {
    'Jupiter': jupiterImage,
    'Orion': orionImage,
    'Europa': europaImage,
    'Lagrange': lagrangeImage,
    'Saturn': saturnImage,
    'Betelgeuse': betelgeuseImage,
    'Io': ioImage,
    'Titan': titanImage,
    'Callisto': callistoImage,
    'Hubble': hubbleImage,
    'Enceladus': enceladusImage,
    'Sun': sunImage
}

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

    // Effects
    useEffect(() => {
        const userAnswers = Object.values(answers);

        const allCorrect = correctAnswers.every((correctAnswer, index) =>
            correctAnswer.toLowerCase() === userAnswers[index].toLowerCase()
        );
        if (allCorrect) {
            setTimeout(() => setAreAnswersCorrect(true), 500);
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
            case 'Europa':
                style.backgroundPosition = '0 10rem';
                style.transformOrigin = '50% 80%'
                break;
            case 'Lagrange':
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
            case 'Callisto':
                style.backgroundPosition = 'center 8rem';
                style.backgroundSize = '150%';
                break;
            case 'Hubble':
                style.transformOrigin = '50% 0'
                break;
            case 'Enceladus':
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
                        'Europa': 'Europa',
                        'Lagrange': 'Lagrange',
                        'Saturn': 'Saturn',
                        'Betelgeuse': 'Betelgeuse',
                        'Io': 'Io',
                        'Titan': 'Titan',
                        'Callisto': 'Callisto',
                        'Hubble': 'Hubble',
                        'Enceladus': 'Enceladus',
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
                    <div className={'spline'}>
                        {areAnswersCorrect &&
                            <Spline scene={'https://prod.spline.design/UnWOMLkS9rzBfEZy/scene.splinecode'}/>}
                    </div>
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
