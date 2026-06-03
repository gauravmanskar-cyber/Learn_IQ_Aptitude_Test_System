import React from 'react'
import useCounter  from './UseCounter'

export const ChildX = () => {
    const{count,handleIncrement,handleDecrement} = useCounter();
  return (
    <div>
        {count}
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>

    </div>
  )
}
