
const API_KEY=process.env.REACT_APP_API_KEY;

const express=require('express')
const cors = require('cors')
const app=express()

const port=8000

app.use(express.json())
app.use(cors())

app.post('/generate',async(req,res)=>{
    const options={
        method:"POST",
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:req.body.message}],
            max_tokens:100,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data =await response.json()
        res.send(data)
        console.log(data)

    }catch(error){
        console.log(error)
    }
})


app.listen(port,()=>console.log(`Your server is running on port ${port}`))


