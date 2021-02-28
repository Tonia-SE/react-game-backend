import express from 'express'
import { GameResult } from '../models/gameResults'

export const resultsRouter: express.Router = express.Router()

resultsRouter.options(
  '/',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, DELETE')
    res.sendStatus(200)
  },
)

resultsRouter.post(
  '/',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    const user = req.body.user
    const seconds = req.body.seconds
    const minutes = req.body.minutes
    const score = req.body.score
    GameResult.insertMany({
      user: user,
      seconds: seconds,
      minutes: minutes,
      score: score,
    })
    res.status(200)
    res.json({ result: 'Game results were updated' })
  },
)

resultsRouter.get(
  '/',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {    
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    let filter = {}
    const orders = await GameResult.find(filter)
    res.status(200)
    res.json(orders)
  },
)
