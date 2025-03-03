import React, { useState, useEffect } from "react"


const Game =()=>{

    const rows=6;
    const cells=rows*rows;
    const initialCell= Array(cells).fill(null);
    const [box]= useState(initialCell);

    const [start,setStart]= useState(false);
    const [delay,setDelay]= useState();
    const [selectedCell,setSelectedCell]= useState(null);
    const [newTime,setNewTime]= useState();
    const [userClick, setUserClick] =useState([]);


    const randomCell=()=>{
        return Math.floor(Math.random()*cells);
    };

    const handleStart=()=>{
        if(delay){
        const date= new Date();
        const now = date.getTime();
        setNewTime(now);
        setStart(true);
        setSelectedCell(randomCell());
        }
    };

    const handlePause=()=>{
        
        const date= new Date();
        const now = date.getTime();
        setNewTime(now);
        setSelectedCell(null);
        setStart(false);
    };

    const handleReset=()=>{
        setUserClick([]);
        setSelectedCell(null);
        setStart(false);
        setDelay("");
    };

    const onHandleInputChange=(value)=>{
        const userDelay = parseInt(value);
        if(userDelay<=60){
            setDelay(userDelay);
        }
    };

    const handleCellClick=()=>{
        const date = new Date();
        const now = date.getTime();

        const difference =((now-newTime)/1000).toFixed(4);

        const newEntry={
            clickNumber:userClick.length+1,
            clickTime:difference,
        }
        console.log("user clicked"+userClick.clickNumber);
        setUserClick((Prev)=>[...Prev, newEntry]);
        setSelectedCell(randomCell());
        setNewTime(now);

    }
   let timer=0;
    useEffect(()=>{
        if(userClick.length===0){
            setSelectedCell(null);
            
        }

        if(start){
        timer= setInterval(()=>{

            setSelectedCell(randomCell());
         }, delay*1000);

         return()=> clearInterval(timer);


        }
    }, [start]);


    return(
<>
<h1>Box hunt game</h1>
<div className="header">
<input 
 value={delay}
 placeholder="Enter delay"
 max={60}
 min={1}
 onChange={(e)=>onHandleInputChange(e.target.value)}
></input>


<button onClick={handleStart}>Start</button>
<button onClick={handlePause}>Pause</button>
<button onClick={handleReset}>Reset</button>

</div>
<div className="playArea">
{box.map((item,index)=>{

    return(
        <button
        key={item}
        onClick={handleCellClick}
        disabled={selectedCell!==index}
        className={`cells ${selectedCell===index? "selectedCell": ""}`}
        >
          {item}
        </button>
    )
})}
</div>

    <table>
        <thead>
      <tr>
        <th>Mouse ClickNumber </th>
        <th>Reaction</th>
      </tr>
      </thead>
       <tbody>
        
       {userClick?.map((item, index)=>{
         return(
            <tr key={item.clickNumber}>
                <td>{item.clickNumber}</td>
                <td>{item.clickTime}</td>
                </tr>
         );

       })

       };
       </tbody>

    </table>


</>
    );
}

export default Game;