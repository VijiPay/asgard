import express from 'express';
import UserController from './modules/user/controllers/CreateUserController';
import UserRepository from './modules/user/repositories/CreateUser.repository';
import CreateUser from './modules/user/use-cases/CreateUser.usecase';
import errorHandler from './shared/middleware/error.handler';
import morgan from 'morgan';

const app = express();
app.use(express.json());

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);
const userController = new UserController(createUser);

app.use(morgan('dev'))

app.get('/', async (req, res) => {
  res.json({ message: 'Hello, world!' })
})

app.use((err, res) =>{
  errorHandler(err, res);
});

app.post('/user', (req, res) => userController.createUser(req, res));

export default app;
