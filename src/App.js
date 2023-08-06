import './App.css';
import { useState,useEffect } from 'react';
function App() {
 const [value,setValue]=useState(null)
  const [message,setMessage]=useState(null)
  const [previousChats,setPreviousChats]=useState([])
  const [currentTitle,setCurrentTitle]=useState([])
  
  const createNewChat=()=>{
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handelClick=(uniqueTitles) =>{
    setCurrentTitle(uniqueTitles)
    setMessage(null)
    setValue("")

  }

  const getMessages=async()=>{
    const options={
      method:"POST",
      body:JSON.stringify({
        message:value
      }),headers:{
        "Content-Type":"application/json"
      }
    } 
    try{
      const response=await fetch('http://localhost:8000/generate',options)
      const data=await response.json()
      console.log(data)
      setMessage(data.choices[0].message)
      

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    console.log(currentTitle,value,message)
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }if(currentTitle && value && message){
      setPreviousChats(previousChats=>(
        [...previousChats,{
          title:currentTitle,
          role:"user",
          content:value
        },{
          title:currentTitle,
          role:message.role,
          content:message.content
        }]
      ))

    }},[message,currentTitle])

const currentChat=previousChats.filter(previousChat=>previousChat.title === currentTitle)
const uniqueTitles=Array.from(new Set(previousChats.map(previousChats=>previousChats.title)))

  return (
    <div className="app">
      <section className='side-bar-history'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitles,index)=> <li key={index} onClick={()=>handelClick(uniqueTitles)}>{uniqueTitles}</li>)}
        </ul>

        <nav>
          <p>Made by pushkar</p>
        </nav>
      </section>

      <section className="chat-main">
        {!currentTitle && <h1>PushkarGpt</h1>}


        <ul className='feed'>
          {currentChat.map((chatMessage,index)=><li key={index}>
            <p className='role'>{chatMessage.role} :-</p>
            <p> {chatMessage.content}</p>
          </li>)}
        </ul>


        <div className='buttom-section'>
          <div className='input-countainer'>
            <input placeholder="Do Not Press Submit that cause you token loose" value={value} onChange={(e)=>setValue(e.target.value)}/>
            <div id='submit' onClick={getMessages}>➢</div>
          </div>
          <p className='info'> chat Gpt Mar 14 version. Free research Preview</p>
        </div>
      </section>


    </div>
  );
}

export default App;
