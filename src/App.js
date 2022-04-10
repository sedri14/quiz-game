import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = (api) => (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then((response) => response.json())
      .then((json) => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;

    return (
      <p>
        <button onClick={this.handleClick("hello")}>
          {loading ? "Loading..." : "Call Lambda"}
        </button>
        <button onClick={this.handleClick("async-dadjoke")}>
          {loading ? "Loading..." : "Call Async Lambda"}
        </button>
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}

// class Welcome extends Component {
//   render() {
//     return <h1>Hello, {props.name}</h1>;
//   }
// }

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <Welcome name="Sharoni" />
//           <LambdaDemo />
//         </header>
//       </div>
//     );
//   }
// }

// const result = {
//   category: "Science: Computers",
//   type: "multiple",
//   difficulty: "easy",
//   question:
//     "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
//   correct_answer: "Apple",
//   incorrect_answers: ["Microsoft", "Atari", "Commodore"],
// };

// class Answer extends Component {
//   render() {
//     return (
//       <div className="answer-rec">
//         <p>{this.props.correct_answer}</p>
//       </div>
//     );
//   }
// }

function optionsArray(items) {
  let arr = new Array();

  for (let i = 0; i < items.length; i++) {
    let arrToAdd = new Array();
    for (let j = 0; j < items[i].incorrect_answers.length; j++) {
      arrToAdd.push(items[i].incorrect_answers[j]);
    }
    arrToAdd.push(items[i].correct_answer);
    arr.push(arrToAdd);
  }
  return arr;
}

function QuestionAndAnswers(props) {
  const { items, optionsArray, handlerEnd } = props;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerButtonClick = (QuestionIndex, SelectedAnswer) => {
    if (SelectedAnswer === items[QuestionIndex].correct_answer) {
      alert("CORRECT!");
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < items.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert("end of quiz!");
      {
        handlerEnd();
      }
    }
  };

  return (
    // <div>
    //   {console.log("Question: ", props.result.question)}
    //   <QuestionSec question={props.result.question}></QuestionSec>
    //   {console.log("INCORRECT: ", props.result.incorrect_answers)}
    //   <AnswersSection
    //     correctAnswer={props.result.correct_answer}
    //     incorrectAnswers={props.result.incorrect_answers}
    //   ></AnswersSection>
    // </div>

    <div>
      {/* <div className="question-sec">
        {items.map((item) => {
          return <div>{item.question} </div>;
        })}
        <div>
          <p></p>
        </div>
      </div> */}

      <div className="question-sec">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{items.length}
        </div>
        <div className="question-text">{items[currentQuestion].question}</div>
      </div>

      <div className="answers-sec">
        {/* <section className="center">
          {items[currentQuestion].incorrect_answers.map((answer) => (
            <button onClick={handleButtonClick}>{answer}</button>
          ))}
          <button onClick={handleButtonClick}>
            {items[currentQuestion].correct_answer}
          </button>
        </section> */}

        <section className="center">
          {optionsArray[currentQuestion].map((answer) => (
            <button
              onClick={() => handleAnswerButtonClick(currentQuestion, answer)}
            >
              {answer}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}

// function QuestionSec(props) {
//   return (
//     <div>
//       <p>{props.question}</p>
//     </div>
//   );
// }

// function AnswersSection(props) {
//   return (
//     <section className="center">
//       {console.log("IN ANSWERSsECTION: ", props.correctAnswer)}
//       <section className="container">
//         {}
//         {/* <Answer option={props.incorrectAnswers.at(0)} />
//         <Answer option={props.correctAnswer} />
//         <Answer option={props.incorrectAnswers.at(1)} />
//         <Answer option={props.incorrectAnswers.at(2)} /> */}
//       </section>
//     </section>
//   );
// }

function Answer(props) {
  return (
    <button>
      <p>{props.option}</p>
    </button>
  );
}

class StartGameButton extends React.Component {
  // handleClick = () => {
  //   console.log("start game button clicked!");
  // };

  render() {
    return <button onClick={this.props.handler}>Start Game!</button>;
  }
}

class GameMainScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <section className="game-info">
          <p className="label-question-count">
            <span className="question-count">5</span>/20
          </p>
          <p className="label-score">
            Score: <span className="score">20</span>
          </p>
          <p className="label-highscore">
            Highscore:
            <span className="highscore">0</span>
          </p>
        </section>
        <button className="btn again">Again!</button>
        <div className="number">?</div>

        <section className="q&a-sec">
          {this.props.items == null ? (
            <></>
          ) : (
            <QuestionAndAnswers
              items={this.props.items}
              optionsArray={this.props.optionsArray}
              handlerEnd={this.props.handlerEnd}
            />
          )}
        </section>
      </div>
    );
  }
}

const gameStages = {
  start: 0,
  during: 1,
  end: 2,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.handlerEnd = this.handlerEnd.bind(this);

    this.state = {
      gameStages: gameStages.start,
      items: null,
      DataIsLoaded: false,
      score: 0,
      highscore: 0,
    };
  }

  handler() {
    this.setState({
      gameStages: gameStages.during,
    });
  }

  handlerEnd() {
    this.setState({
      gameStages: gameStages.end,
    });
  }

  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=20&category=18&type=multiple")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          items: result.results,
          DataisLoaded: true,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Quiz Game</h1>
        </header>
        <main>
          {this.state.gameStages === gameStages.start ? (
            <StartGameButton handler={this.handler} />
          ) : this.state.gameStages === gameStages.during ? (
            <GameMainScreen
              items={this.state.items}
              optionsArray={optionsArray(this.state.items)}
              handlerEnd={this.handlerEnd}
            />
          ) : (
            <h2>END GAME</h2>
          )}

          <LambdaDemo />
        </main>
      </div>
    );
  }
}

export default App;
