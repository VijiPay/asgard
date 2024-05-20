import express from 'express'
import morgan from 'morgan'
import db from './modules/database'

const app = express()
app.use(morgan('dev')) // logger

app.get('/', async (req, res) => {
  const users = await db.user.findMany()
  res.json(users)
})

app.get('/userz', async (req, res) => {
  const users = await db.user.findMany()
  res.json(users)
})

const port = Number(process.env.PORT ?? 8080)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`)
})
