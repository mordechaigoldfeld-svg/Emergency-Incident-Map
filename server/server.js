import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import helmet from 'helmet'
import userRoute from './ROUTES/user_route.js'
import incidentRoute from './ROUTES/incident_route.js'
import { tokenValidator } from './MIDDLEWARE/auth_middle.js'



const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())


app.use('/auth', userRoute)
app.use('/incidents',tokenValidator,incidentRoute)


// app.get('/test',(req,res)=>{
//     const {id,name}= req.query
//     res.json({'success':"health"})
// })


const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: [CLIENT_ORIGIN]
    }
})




server.listen(PORT, () => {
    console.log('server running.....')

})