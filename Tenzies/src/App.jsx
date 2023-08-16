import React from 'react'
import Confetti from 'react-confetti'
import './App.css'
import Dice from './components/Dice' 
function App() {
  const[dice,setDice]=React.useState(newDice())

  const [tenzies,setTenzies]=React.useState(false)
  const [moves,setMoves]=React.useState(0)
  const [best,setBest]=React.useState(0)
  
  React.useEffect(()=>{
    const checkIsHeld=dice.every(die=> die.isHeld)
    const firstValue=dice[0].value
    const checkValue=dice.every(die=> die.value===firstValue)
    if(checkIsHeld && checkValue){
      setTenzies(true)
      console.log("you won")
    }

  }
   
  ,[dice])
function generateDice(){
  const val=["\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"]

 return {value:val[Math.ceil(Math.random()*6-1)],
    isHeld:false}
}
  function newDice(){
    const newDice=[]

    for (let i=0;i<10;i++){
      newDice.push(generateDice()
      )
    }
    return newDice
  }
  const elements=dice.map((dice,i)=> <Dice key={i} value={dice.value} isHeld={dice.isHeld} isHold={()=>{holdDice(i)}}/>)

  function change(){
    if(!tenzies){
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
      die :
      generateDice()
    }))
    countMoves()
  }
  else{
    setTenzies(false)
    setDice(newDice())
    localStorage.setItem("best",JSON.stringify(moves))
    setMoves(0)
  }
  }



  function holdDice(id) {
    setDice(oldDice=> oldDice.map((dic,ind)=>{
      return id===ind ? {...dic,isHeld: !dic.isHeld} :dic
    }) )
}
function countMoves(){
  setMoves(old=> old+1)
  console.log("hello")
}
React.useEffect(()=>{
  let bes=JSON.parse(localStorage.getItem("best"))
  if (bes<best)
  setBest(bes)
},[tenzies])
    return(
      <>
      {tenzies && <Confetti />}
       <div className="box-holder">

<div className="box">
<h1>TENZIE</h1>
<p>
Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
</p> 

<div className="score-container">
<div className='Score'>Best Score:{best}</div> <div className='moves'>Moves :{moves}</div>
</div>

<div className="dice-container">
  {elements}
 

</div>

<button onClick={change}>
  {tenzies ? "New Game" :"Roll"}
</button>

</div>

</div>
      </>
    )
 
}

export default App
