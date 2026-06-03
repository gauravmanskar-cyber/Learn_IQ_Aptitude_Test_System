
import {useState,React} from 'react'

const DemoUseState = () => {

    //  const [count, setcount] = useState()

  // const[state,setcount]=useState({count:0,clicks:0})

  // const[item,setItem]=useState([])

  // const[allvalue,setallvalue] = useState({firstname:"Gaurav",lastname:"Manaskar",age:21})
  // const handleClick =()=>{
  //   setallvalue({...allvalue, firstname:"nayana", age:19})
  // }

  // const[task,setTask] = useState(["learn react","build project"])
  // const handletask = ()=>{
  //   setTask([...task,"learn backend"])
  // }

        //  {/* lazzy initialization */}
        function expensive(){
          console.log("execute")
          return 10;
        }

        const[count, setcount] = useState(()=>expensive())

        // nested usestate
        // const[allvalue,setallvalue]=useState({firstname:"Gaurav",lastname:"Manaskar",address:{
        //   city:"pune",
        //   contry:"India"
        // }})

        // const handleClick = ()=>{
        //     setallvalue({...allvalue,firstname:"Nayana",lastname:"Manaskarr",address:{...allvalue, city:"mumbai",contry:"United state"}})
        // }
  return (
    <>
     {/* <h1>count is {state.count}</h1>
      <h1>click is {state.clicks}</h1>
     <button onClick={()=>setcount({...state, count:state.count+1,clicks:state.clicks+1})}>click me</button> */}

        {/* <h1>{item}</h1>
        <button onClick={()=>setItem([...item, `${item.length+1}`])}>click</button> */}

        {/* <div>i am {allvalue.firstname}{allvalue.lastname} and age is {allvalue.age}</div>
        <button onClick={handleClick}>update</button> */}
                        
       {/* {task.map((val)=>{
        return(
          <li>{val}</li>
        )
       })}

       <button onClick={handletask}>add</button> */}

       {/* lazzy initialization */}

        {count}
        <button onClick={()=>setcount(count+1)}>click</button>

        {/* <div>my name is {allvalue.firstname} {allvalue.lastname} and my city is {allvalue.address.city} and country is {allvalue.address.contry}</div>
        <button onClick={handleClick}>update</button> */}
        




    </>
  )
}

export default DemoUseState