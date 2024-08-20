require('dotenv').config()
const Env = process.env
const express = require('express')
const { MongoClient , ServerApiVersion  } = require('mongodb')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const String = Env.STRING
const Port = Env.PORT

app.use(cors())
app.use(bodyParser.json())

const client = new MongoClient( String , {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB !');
    } catch ( err ) {
        console.error('Error connecting to MongoDB:', err);
    }
}
run()

const Users = client.db('Rent').collection('Members')
const Properties = client.db('Rent').collection('Properties')

require('./src/router.js')(app, Users, Properties)

app.listen( Port, () => {
    console.log(`Server is running : http://localhost:${Port}`)
})