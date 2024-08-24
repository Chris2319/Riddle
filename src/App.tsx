import './App.scss';
import jsonData from './data.json';
import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import jupiterImage from './assets/jupiter+nasa+photo.jpg';
import orionImage from './assets/Orion.jpg';
import europaImage from './assets/Europa.webp';
import lagrangeImage from './assets/Lagrange.webp';
import saturnImage from './assets/saturn.jpg';
import betelgeuseImage from './assets/Betelgeuse.webp';
import ioImage from './assets/Io.jpg';
import titanImage from './assets/Titan.jpeg';
import callistoImage from './assets/Callisto.jpg';
import hubbleImage from './assets/Hubble.webp';
import enceladusImage from './assets/Enceladus.jpg';
import sunImage from './assets/sun.jpg';


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

function App() {
    const [data] = useState<QuizData>(jsonData as QuizData);
    const [answers, setAnswers] = useState<Answers>({
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
    });
    const [answerImages] = useState<any>({
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
    });
    const [activeItem, setActiveItem] = useState<QuizQuestion>({answer: 'Jupiter'} as QuizQuestion);
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

    const vCard = {
        visible: {opacity: 1, transition: {duration: 2}},
        hidden: {opacity: 0, transition: {duration: 2}},
    };

    const handleOnChange = (val: string, ans: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [ans]: val
        }));
    };

    const handleCorrect = (item: QuizQuestion, index: number): boolean => {
        return answers?.[item.answer as keyof typeof answers]?.toLowerCase() === correctAnswers[index]?.toLowerCase();
    };

    const removeBlur = () => {
        const index = correctAnswers.findIndex((a) => a === activeItem.answer);
        if (index > -1 && answers[activeItem?.answer as keyof typeof answers]?.toLowerCase() === correctAnswers[index]?.toLowerCase()) return true;
        return false;
    };

    const areAnswersCorrect = () => {
        const userAnswers = Object.values(answers as any) as any;
        return correctAnswers.every((correctAnswer, index) =>
            correctAnswer.toLowerCase() === userAnswers[index as any].toLowerCase()
        );
    };

    return (
        <div className={'wrapper'}>
            <AnimatePresence>
                <div className={`background ${removeBlur() ? 'background--removeBlur' : ''}`} style={{
                    backgroundImage: `url(${answerImages[activeItem.answer]})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    transition: 'all 800ms ease-in-out'
                }}>

                    {
                        areAnswersCorrect() && <div className={'answer'}>
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

                    {/*<div><span layoutId={'J'}>J</span><span>u</span><span>p</span></div>*/}


                </div>
                {
                    data.quiz.map((item: any, index: number) => (
                        <motion.div
                            onMouseEnter={() => setActiveItem(item)}
                            onMouseLeave={() => null}
                            initial={vCard.hidden}
                            animate={areAnswersCorrect() ? vCard.hidden : vCard.visible}
                            key={item.answer}
                            className={'card'}>
                            <h3>{item.question}</h3>

                            {
                                handleCorrect(item, index) ?
                                    <div className={'card--answer'}>{item.answer.split('').map((l: string, li: number) =>
                                        li === 0 ? (areAnswersCorrect() ? <div>{l.toUpperCase()}</div> :
                                                <motion.div transition={{duration: 2, delay: 1}}
                                                            layoutId={(index === 10 || index === 11 || index === 12) ? l.toUpperCase() + '2' : l.toUpperCase()}>{l}</motion.div>) :
                                            <div>{l}</div>)}</div> : <input
                                        className={handleCorrect(item, index) ? 'input--correct' : 'input--wrong'}
                                        placeholder={'*'.repeat(item.answer.length)}
                                        disabled={handleCorrect(item, index)}
                                        value={answers[item.answer as keyof typeof answers]}
                                        onChange={(e) => handleOnChange(e.target.value, item.answer)}/>
                            }


                            <ul>
                                {item.hints.map((hint: string) => (
                                    <li key={hint}>{hint}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div>
    );
}

export default App;
