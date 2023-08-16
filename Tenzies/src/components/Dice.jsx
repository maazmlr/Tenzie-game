import React from "react";

function Dice({value,isHeld,isHold}){
  const style={
    backgroundColor:isHeld?"green":"white"
  }
  
    
    return (
        <div className="die-face" style={style} onClick={isHold}>
        <h2>{value}</h2>
        </div>
    )
}
export default Dice