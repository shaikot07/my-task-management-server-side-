const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;



// middlewer
app.use(cors());
app.use(express.json())



app.get('/', (req,res)=>{
      res.send('simple CRUD in Running')
})
app.listen(port, ()=>{
      console.log(`Simple CURD is running on port,${port}`);
})