import React, { useState, useEffect } from 'react';

const Game = () => {

    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1)
    const [input, setInput] = useState("");
    const [attempts, setAttempts] = useState(10);
    const [prevGuess, setPrevGues] = useState([]);
    const [msg, setMsg] = useState("");
    const [showButton, setShowButton] = useState(false);

    const inputHandler = (e) => {
        setInput(parseInt(e.target.value));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (input < 1 || input > 100 || attempts === 0) return;
        if (input === randomNumber) {
            return (
                setShowButton(true),
                setMsg(<div className="bg-success">
                    Congratulations! You got it right!
                </div>),
                setPrevGues(
                    [...prevGuess, input]
                )
            );
        };
        if (input < randomNumber) {
            return (
                setMsg(<div className="bg-info">
                    UPS! The last guess was too low!
                </div>),
                setPrevGues(
                    [...prevGuess, input]
                ),
                setAttempts((prevCount) => prevCount - 1),
                setInput("")
            );
        } else {
            return (
                setInput(""),
                setMsg(<div className="bg-danger">
                    UPS! The last guess was too high!
                </div>),
                setPrevGues(
                    [...prevGuess, input]
                ),
                setAttempts((prevCount) => prevCount - 1)
            );
        };
    };

    const clearHandler = (e) => {
        e.preventDefault();
        return (
            setInput("")
        );
    };

    const resetHandler = () => {
        return (
            setRandomNumber(Math.floor(Math.random() * 100) + 1),
            setInput(""),
            setPrevGues([]),
            setAttempts(10),
            setShowButton(false),
            setMsg("")
        );
    };

    const startHandler = () => {
        return resetHandler();
    }

    useEffect(() => {
        if(attempts === 0 && input === randomNumber) {
            return (
                setShowButton(true),
                setMsg(<div className="bg-success">
                    Congratulations! You got it right!
                </div>),
                setPrevGues(
                    [...prevGuess, input]
                )
            )} else if (attempts === 0) {
            return (
                setMsg(<div className="bg-warning">
                    GAME OVER!
                </div>),
                setShowButton(true)
            );
        }
    }, [attempts, input, prevGuess, randomNumber]);
    
    return (
        <div className="game">
            <div className="inputForm">
                <h1>Guess the number from 1 to 100:</h1>
                <input type="number"
                        disabled={prevGuess[prevGuess.length - 1] === randomNumber}
                        min="0" 
                        max="100" 
                        onChange={inputHandler}
                        value={input}
                        placeholder="Enter a number" />
            </div>
            <div className="buttons">
                <button type="submit"
                        disabled={prevGuess[prevGuess.length - 1] === randomNumber}
                        onClick={submitHandler}>
                            Submit
                </button>
                &nbsp;&nbsp;
                <button type="clear"
                        disabled={prevGuess[prevGuess.length - 1] === randomNumber}
                        onClick={clearHandler}>
                            Clear
                </button>
                &nbsp;&nbsp;
                <button type="reset"
                        onClick={resetHandler}>
                            Reset
                </button>
                &nbsp;&nbsp;
                {showButton && <button type="start"
                                        onClick={startHandler}>
                            New game
                </button>}
            </div>
            <div className="attempts">
                <p>{attempts} attempts left</p>
            </div>
            <div className="prevGuess">
                <p>Previous guesses: {prevGuess.join(", ")}</p>
            </div>
            {msg}
        </div>
    )
};

export default Game;