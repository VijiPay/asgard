import express from 'express'
import morgan from 'morgan'
import UserController from './modules/user/controllers/CreateUserController'
import UserRepository from './modules/user/repositories/CreateUser.repository'
import CreateUser from './modules/user/use-cases/CreateUser.usecase'
import errorHandler from './shared/middleware/error.handler'

//routes
import userRouter from './routes/userRoutes'

const app = express()
app.use(express.json())
app.use('/api/v1/user', userRouter)

const userRepository = new UserRepository()
const createUser = new CreateUser(userRepository)
const userController = new UserController(createUser)

app.use(morgan('dev'))

app.get('/', async (req, res) => {
  res.json({ message: 'Hello, world!' })
})

app.use((err, res) => {
  errorHandler(err, res)
})

app.post('/user', (req, res) => userController.createUser(req, res))

export default app
