import './index.scss';
import {useState} from 'react';

const questions = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

function App() {
    const [step, setStep] = useState<number>(0)
    const [correct, setCorrect] = useState<number>(0)
    const question = questions[step]

    const onClickVariant = (index: number) => {
        setStep(step + 1)
        if (index === question.correct) setCorrect(correct + 1)
    }

    return (
        <div className="App">
            {
                step !== questions.length
                    ? <Game question={question}
                            step={step}
                            onClickVariant={onClickVariant}
                    />
                    : <Result correct={correct}/>
            }
        </div>
    );
}


type QuestionType = {
    title: string
    variants: string[]
    correct: number
}

type GameType = {
    question: QuestionType
    step: number
    onClickVariant: (value: number) => void
}

function Game({question, step, onClickVariant}: GameType) {
    const percentage = Math.round(step / questions.length * 100)

    return (
        <>
            <div className="progress">
                <div style={{width: `${percentage}%`}} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((text, i) =>
                    <li key={crypto.randomUUID()} onClick={() => onClickVariant(i)}>
                        {text}
                    </li>)}
            </ul>
        </>
    );
}

type ResultType = {
    correct: number
}

function Result({correct}: ResultType) {
    const plural = require('plural-ru');

    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"/>
            <h2>Вы отгадали {plural(correct, '%d ответ', '%d ответа', '%d ответов')} из {questions.length}</h2>
            <a href="/">
                <button>Попробовать снова</button>
            </a>
        </div>
    );
}

export default App;
