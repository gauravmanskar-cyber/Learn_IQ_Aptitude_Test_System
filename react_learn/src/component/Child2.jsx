import React from 'react'

export const Child2 = React.memo(({handleClick}) => {
    console.log("react Re-reder");
  return (
    <>
       <button onClick={handleClick}>submit</button>

    </>
  )
});
