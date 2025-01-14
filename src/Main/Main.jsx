import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EndCard from '../EndCard/EndCard';
import styles from './Main.module.css'

const Main = () => {
    const [data , setData] = useState([]);
    const [index , setIndex] = useState(0);
    const [options , setOptions] = useState([]);
    const [time , setTime] = useState(5);
    const [start , setStart] = useState(true);
    const [score,setScore] = useState(0);
console.log("score :" , score);

    const handleSkip = () =>{
        setIndex((prev) =>{
            if(prev >= 11) {
                return  11;
            }else{
                return prev + 1;
            }
        })
    }

    const endQuiz = () =>{
        return <EndCard score = {score} />;
    }


const handleAnswer = (i) =>{
    // if(options[i] == data.correct_answer){
    //     setScore(prev => prev + 1);
    // }
    // console.log(" i: " , i);
    

    if(options[i] == data[index- 1].correct_answer){
        setScore(prev => prev + 1);
    }
    
    
    setIndex((prev) =>{
        if(prev >= 11) {
            return 11;
        }else{
            return prev + 1;
        }
    })
}
    console.log(index);

    const handleStart = () =>{
        setStart(false);
        setIndex(prev  => prev + 1);
        
    }

    useEffect(() =>{
           const axo = async () =>{
        console.log(data);

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
        


   if(data.length > 0 && index  < 11 ){
    // console.log(data[index - 1].incorrect_answers);
    
   let Options = data[index - 1].incorrect_answers.map((ele) => {
               return ele;
    })
    console.log("Options : ",Options);

       Options.push(data[index - 1].correct_answer)
console.log("Options : ",Options);

       setOptions([
        ...Options,

       ]);
   }
    

    },[index])

    
 useEffect(() =>{
console.log(options);


    let interval;
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
 },[index]);

  return (
    <div>
     {
     index == 11 ? endQuiz()  : <div>
        {
             start ?<div className={styles.start_header}>
               <div>
               <h2>Click "start" to start Quiz</h2>
               <button onClick={handleStart}>Start</button>
               </div>
             </div> :
            <div className={styles.ques_con}>
                 <div className={styles.ques_box}>
             <h1>Question no : {index}</h1>
          <div className={styles.question}>
          <h2>{data[index - 1].question}</h2>
          </div>
             <ul className={styles.options_con}>
            
 
                 {
                  options.length != 0 ? options.map((ele,i) =>{
                         return <li className={styles.options} key={i}><button onClick={() => handleAnswer(i)}>{ele}</button></li>
                     }) : null
                 }
 
 
             </ul>
              <h3 className={styles.time}>Time Remaining : {time}s</h3>
              <button className={styles.skip} onClick={handleSkip}>Skip Question</button>
          </div>
            </div>
          }
        </div>
     }
       
    </div>
  )
}

export default Main