import express from 'express'
import { authRouter } from './auth'
import { resultsRouter } from './results'

export interface IRoute {
  endpoint: string
  router: express.Router
}

const root: express.Router = express.Router()
root.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE')
  res.send(200)
})

export const routes: Array<IRoute> = [
  { endpoint: '/', router: root },
  { endpoint: '/auth', router: authRouter },
  { endpoint: '/results', router: resultsRouter}
]
