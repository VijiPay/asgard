
import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UserController = () => import ('#controllers/user_controller')

export default function userRoutes() {
  Route.group(() => {
    Route.get('/', [UserController, 'getAllUsers']).use([middleware.authorized(['admin'])])
    Route.get('/:id', [UserController, 'getUser'])
    Route.put('/:id', [UserController, 'update'])
    Route.delete('/:id', [UserController, 'delete'])
    Route.put('/:id/change-password', [UserController, 'changePassword'])
  }).prefix('/v1/users')
  .use(middleware.auth())


  Route.group(() => {
    Route.post('/create', [UserController, 'create'])
  }).prefix('/v1/users')
}
