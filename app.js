const fs = require('fs')
const express = require('express')
const app = express()



app.get("/video",(req,res)=>{

    const range = req.headers.range

    if(!range){

        res.status(400).send("<h1>Range header required</h1>")
    }

        const videopath ="./videos/sample-mp4-file.mp4"
        const size = fs.statSync("./videos/sample-mp4-file.mp4").size
        const chunksize = 10**6
        const start = Number(range.replace(/\D/g,""))

        const end = Math.min(start+chunksize,size-1)


        const contentlenght = end- start+1

        

        const headers = {
            "Content-Range" : `bytes ${start} - ${end}/${size}`,
            "Accepted-Range" : "bytes",
            "Content-Length" : contentlenght,
            "Content-Type" : "video./mp4"
        }

        res.writeHead(206,headers)

        const videostream = fs.createReadStream(videopath,{start,end})
        videostream.pipe(res)
        var i = 0
        console.log("data packet sent"+(i+1))
    }
)

app.listen(4000,"127.0.0.1",()=>{

    console.log("Server running at port 4000")
})