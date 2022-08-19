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
    const [counter, setCounter] = useState<number>(0)
    const [result, setResult] = useState<number>(0)

    return (
        <div className="App">
            {questions.length !== counter &&
                <Game question={questions[counter]}
                      counter={counter}
                      setCounter={setCounter}
                      result={result}
                      setResult={setResult}
                />}
            {questions.length === counter &&
                <Result result={result}
                        countQuestion={questions.length}
                        setCounter={setCounter}
                        setResult={setResult}
                />}
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
    counter: number
    result: number
    setCounter: (counter: number) => void
    setResult: (value: number) => void
}

function Game({question, counter, setCounter, result, setResult}: GameType) {

    const clickHandler = (index: number) => {
        setCounter(counter + 1)
        if (index === question.correct) setResult(result + 1)
    }

    return (
        <>
            <div className="progress">
                <div style={{width: '50%'}} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((str, i) =>
                    <li key={crypto.randomUUID()}
                        onClick={() => clickHandler(i)}
                    >
                        {str}
                    </li>)}
            </ul>
        </>
    );
}

type ResultType = {
    countQuestion: number
    result: number
    setCounter: (counter: number) => void
    setResult: (value: number) => void
}

function Result({result, countQuestion, setCounter, setResult}: ResultType) {
    const plural = require('plural-ru');

    const clickHandler = () => {
        setCounter(0)
        setResult(0)
    }

    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"/>
            <h2>Вы отгадали {plural(result, '%d ответ', '%d ответа', '%d ответов')} из {countQuestion}</h2>
            <button onClick={clickHandler}>Попробовать снова</button>
        </div>
    );
}

export default App;
