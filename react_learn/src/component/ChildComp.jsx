import React from 'react'

const ChildComp = ({havycall}) => {
    console.log("Child component");
  return (
    <>
        <div>{havycall}</div>
    </>
  )
}

export default React.memo(ChildComp)