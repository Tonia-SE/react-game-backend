import express from 'express'
import { IUser, Users } from '../models/users'

export const authRouter: express.Router = express.Router()

authRouter.options(
  '/register',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods: OPTIONS')
    res.send(200)
  },
)

authRouter.post(
  '/register',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    const { user, password } = JSON.parse(Buffer.from(req.body.data, 'base64').toString('ascii'))
    if (user === undefined || password === undefined || user === '' || password === '') {
      res.status(404)
      res.json({ result: `Wrong request. Can't parse user and password from payload` })
    } else {
      const foundUsers: Array<IUser> = await Users.find({ username: user })
      if (foundUsers.length === 0) {
        Users.insertMany({
          username: user,
          password: password,
          token: '',
        })
        res.status(200)
        res.json({ result: 'User was registered' })
      } else {
        res.status(403)
        res.json({ result: 'Such username is already taken' })
      }
    }
  },
)

authRouter.options(
  '/login',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods: OPTIONS')
    res.send(200)
  },
)

authRouter.post(
  '/login',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    const { user, password } = JSON.parse(Buffer.from(req.body.data, 'base64').toString('ascii'))
    if (user === undefined || password === undefined) {
      res.status(404)
      res.json({ result: `Wrong request. Can't parse user and password from payload` })
    } else {
      const foundUsers: Array<IUser> = await Users.find({
        username: user,
        password: password,
      })
      if (foundUsers.length === 0) {
        res.status(403)
        res.json({ result: 'Wrong username or password' })
      } else {
        res.status(200)
        res.json({ result: 'Logged in' })
      }
    }
  },
)
