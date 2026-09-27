import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import helmet from 'helmet'



const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())


const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: [CLIENT_ORIGIN]
    }
})




server.listen(PORT,()=>{
    console.log('server running.....')
    
})