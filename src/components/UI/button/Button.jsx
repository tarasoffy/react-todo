import React from 'react'
import classes from './Button.module.css'

function Button({children, ...props}) {

  return (
    <>
    {props.color === 'red' ?
      <button {...props} style={{border: "1px solid red"}} className={classes.btn}>
        {children}
      </button>:
      <button {...props} className={classes.btn}>
        {children}
      </button>
    }
    </>
  )
}

export default Button