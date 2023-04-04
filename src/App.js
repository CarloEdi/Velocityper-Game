import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import Confetti from 'react-confetti'

function App() {
  const [playTime, setPlayTime] = useState(30);
  const getReadyTimer = ["", 3, 2, 1, "GO!", ""]
  const [timer, setTimer] = useState(playTime);
  const [startGame, setStartGame] = useState(false);
  const [getReadyTimerPosition, setGetReadyTimerPosition] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [optionsSelected, setOptionsSelected] = useState(false)
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);
  const [won, setWon] = useState(false)
  const [timeoutOne, setTimeoutOne] = useState(null)
  const [timeoutTwo, setTimeoutTwo] = useState(null)
  const [timeoutThree, setTimeoutThree] = useState(null)

  const [dinoPosition, setDinoPosition] = useState(0)
  const [vehiclePosition, setVehiclePosition] = useState(200)
  const [terrainPosition, setTerrainPosition] = useState(0)
  const [scaleX, setScaleX] = useState(1)
  const [scaleY, setScaleY] = useState(1)

  const gameResult = (scaleY == -1) ? <h1>Game Over</h1> : won ? <h1>You Won </h1> : ""

  function countDown() {
    if (getReadyTimerPosition < 4){
      setGetReadyTimerPosition(prevPosition => prevPosition + 1)
    }
    else if (getReadyTimerPosition == 4){
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
    setGetReadyTimerPosition(prevPosition => prevPosition + 1)
    }
    else {
      timer > 0 && setTimer((prevTimer) => prevTimer - 1);
      timer > 0 && setDinoPosition((prev) => prev + 10);
    }
  }

  function positionMovement() {
    setTerrainPosition((prev) => prev - 40)
    won && setDinoPosition((prev) => prev - 40)
  }

  function textHandler(event) {
    setText(event.target.value);
  }

  function wordCounter() {
    setVehiclePosition(200 + (10 * (text.trim()
      .split(" ")
      .filter((text) => text !== "").length)))
    return text
      .trim()
      .split(" ")
      .filter((text) => text !== "").length;
  }

  function startTimeoutOneAndTwo() {
    setTimeoutOne(setTimeout(countDown, 1000));
    setTimeoutTwo(setTimeout(positionMovement, 1000));
  }

  function startTimeoutThree() {
    setTimeoutThree(setTimeout(positionMovement, 500))
  }

  function clearTimeoutThree() {
    clearTimeout(timeoutThree)
  }

  function handleClickStart() {
    clearTimeoutThree()
    setStartGame(true);
    setText("");
    setTimer(playTime);
    setDinoPosition(0);
    setTerrainPosition(0);
    setScaleY(1)
    setScaleX(1)
    setWon(false)
    //textBoxRef.current.disabled = false;
    //textBoxRef.current.focus();
  }

  useEffect(() => {
    if ((timer == 0) && (dinoPosition <= vehiclePosition)) {
      setStartGame(false)
      setGetReadyTimerPosition(0)
      setWon(true)
    }
    if (startGame) {
      startTimeoutOneAndTwo()
    }
    if (won && terrainPosition >= -3840) {
      startTimeoutThree()
      setScaleX(-1)
    } 
    if (won && terrainPosition == -3840) {
      setVehiclePosition(1160)
    }
    (wordCount > highScore) && setHighScore(wordCount)
  }, [timer, startGame, getReadyTimerPosition, won, dinoPosition]);

  useEffect(() => {
    setWordCount(wordCounter);
  }, [text]);

  useEffect(() => {
    if (dinoPosition > vehiclePosition) {
      setStartGame(false)
      setGetReadyTimerPosition(0)
      setScaleY(-1)
    } 
  },[dinoPosition, vehiclePosition])


  return (
    <div className="App">
      <h1>Velocityper</h1>
      <textarea
        onChange={textHandler}
        value={text}
        disabled={!startGame || getReadyTimerPosition < 4}
        ref={textBoxRef}
      />
      <div className="dino-track">
      {won &&  <Confetti />}
      <Vehicle 
      src="vehicle.png"
      position={vehiclePosition}
      scaleY={scaleY}>
      </Vehicle>
      <Dino
      src="Velociraptor.png" 
      position={dinoPosition}
      scaleX={scaleX}>
      </Dino>
      <Terrain 
      src="Tree.png"
      position={terrainPosition}
      zIndex={1}>  
      </Terrain>
      <Terrain 
      src="Tree.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Tree.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Tree.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain
      src="Grass2.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Grass.png"
      position={terrainPosition}
      zIndex={0}>
      </Terrain>
      <Terrain 
      src="Grass2.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Grass.png"
      position={terrainPosition}
      zIndex={0}>
      </Terrain>
      <Terrain 
      src="Grass.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Rock.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Cactus.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Cactus.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Mountain.png"
      position={terrainPosition}
      zIndex={0}>
      </Terrain>
      <Terrain 
      src="Cactus.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Rock.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      <Terrain 
      src="Clouds.png"
      position={terrainPosition}
      zIndex={0}>
      </Terrain>
      <Terrain 
      src="Clouds.png"
      position={terrainPosition}
      zIndex={0}>
      </Terrain>
      <Terrain 
      src="Clouds.png"
      position={terrainPosition}
      zIndex={0}>
      </Terrain>
      <Terrain 
      src="Clouds.png"
      position={terrainPosition}
      zIndex={0}>
      </Terrain>
      <Terrain 
      src="Fortress.png"
      position={terrainPosition}
      zIndex={1}>
      </Terrain>
      </div>
      {gameResult}
      <h4>Time: {timer}</h4>
      <button onClick={handleClickStart} disabled={startGame}>
        START
      </button>
      <h1>Word Count: {wordCount}</h1>
      <h4>High Score: {highScore}</h4>
      <h1 className="get-ready-timer">{getReadyTimer[getReadyTimerPosition]}</h1>
      {!optionsSelected ? <button onMouseEnter={() => setOptionsSelected(true)}
      disabled = {startGame}>OPTIONS</button> : 
      <div 
      className="options-container"
      onMouseLeave={() => setOptionsSelected(false)}>
        <button 
        onClick={() => {
          setTimer(30)
          setPlayTime(30)
        }
        }>30 sec</button>
        <button
        onClick={() => {
          setTimer(60)
          setPlayTime(60)
        }}>60 sec</button>
        <button
        onClick={() => {
          setTimer(90)
          setPlayTime(90)
        }}>90 sec</button>
      </div>}
      <div className="footer">
        <a href="https://icons8.com/icons" target='_blank'>App uses icons from Icons8</a>
      </div>
    </div>
  );
}

export default App;

const Dino = styled.img `
position: relative;
left: ${(props) => props.position}px;
transform: scaleX(${(props) => props.scaleX});
z-index: 1;
`

const Vehicle = styled.img `
position: absolute;
left: ${(props) => props.position}px;
width: 50px;
transform: scaleY(${(props) => props.scaleY});
z-index: 1;
transition: 2s;
`

const Terrain = styled.img `
position: relative;
left: ${(props) => props.position}px;
padding-left: 200px;
transition-timing-function: ease-in-out;
transition: 2s; 
z-index: ${(props) => props.zIndex};
`