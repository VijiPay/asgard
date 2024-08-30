
import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import ('#controllers/auth_controller')

export default function authRoutes() {
  Route.group(() => {
    Route.post('/logout', [AuthController, 'logout'])
  }).prefix('/v1/auth')
  .use(middleware.auth())

  Route.group(() => {
    Route.post('/login', [AuthController, 'login'])

    Route.get('/:platform', ({ ally, params }) => {
    const driverInstance = ally.use(params.platform)
    driverInstance.redirect()
  })
  .where('platform', /google|facebook/)

Route.get('auth/:platform/callback', async ({ ally, params }) => {
  const platform = ally.use(params.platform)
  if (platform.accessDenied()) {
    return 'You have cancelled the login process'
  }
  if (platform.stateMisMatch()) {
    return 'We are unable to verify the request. Please try again'
  }
  if (platform.hasError()) {
    return platform.getError()
  }
  const user = await platform.user()
  return user
})

  }).prefix('/v1/auth')
}
