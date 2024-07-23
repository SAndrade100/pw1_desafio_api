import express from 'express'
import checkExistUserAccount from './middleware/checkExistsUserAccount'
import router from './routes/routes'

const app = express()
app.use(express.json())
app.use(router)

app.listen(3333, () => {
    console.table({
        status: "working",
        url: "http://localhost:3333"
    })
})