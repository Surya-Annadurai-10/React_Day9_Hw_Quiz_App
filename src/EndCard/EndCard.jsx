import React from 'react'
import styles from './EndCard.module.css'

const EndCard = (props) => {
  return (
    <>
        <div className={styles.score}>
           <div>
           <h1>Congratulations!🎉🎊🥳  </h1>
           <h2>Your Score : {props.score} / 10</h2>
           </div>
        </div>

    </>
  )
}

export default EndCard