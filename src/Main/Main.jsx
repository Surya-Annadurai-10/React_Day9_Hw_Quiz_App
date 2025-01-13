import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Main = () => {
    const [data , setData] = useState([]);
    const [index , setIndex] = useState(0);
    const [currentQuestion , setCurrentQuestion] = useState({});
    const [time , setTime] = useState(5);
    const [start , setStart] = useState(true);


    const handleSkip = () =>{
        setIndex((prev) =>{
            if(prev >= 9) {
                return 9;
            }else{
                return prev + 1;
            }
        })

        
    }
    console.log(index);

    const handleStart = () =>{
        setStart(false);
        
    }

    useEffect(() =>{
           const axo = async () =>{
            const res = await axios.get("https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple")
            console.log(res.data);
            setData([
                ...data,
                ...res.data.results
            ])

           }

           axo();

    },[])

    useEffect(() =>{
        
        //     setCurrentQuestion({
        //         ...data[index]
        //     })

        // console.log(data[index]);

    },[index])

    useEffect(() =>{
        let interval
       if(index > 0){
        setTime(5);
         interval = setInterval(() =>{
             setTime((prev) =>{
                 if(prev == 0){
                     return 0;
                 }else{
                     return prev - 1;
                 }
             })
            },1000)
 
       }
           return () => clearInterval(interval);
    },[index])

    // console.log(currentQuestion.incorrect_answers);

  return (
    <div>
         {
            start ? <button onClick={handleStart}>Start</button> :
            <div>
            <h1>Question no : {index + 1}</h1>
            <h2>{data[index + 1].question}</h2>
            <ul>
                {
                  data[index + 1].incorrect_answers.map((ele,i) =>{
                        return <li key={i}><button>{ele}</button></li>
                    })
                }


            </ul>
             <h3>Time Remaining : {time}s</h3>
             <button onClick={handleSkip}>Skip Question</button>
         </div>
         }
    </div>
  )
}

export default Main