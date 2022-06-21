import express, { request } from "express"
import bodyParser from "body-parser"
import { connect, getDB } from "./db.js"

const port = 8080
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

connect()

app.post('/add',(req, res) => {
    const newItem = req.body
    getDB().
    collection("todo-list-dalida").
    insertOne(newItem)

    res.status(200).send()
});

app.get("/view-list", (req, res) => {
    getDB().
    collection('todo-list-dalida').
    find({}).
    sort("priority").
    toArray((err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json({err:err})
            return
        }
        res.status(200).json(result)
    })
})

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
  });