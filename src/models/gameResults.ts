import mongoose, { Schema, Document } from 'mongoose'

export interface IGameResult extends Document {
  user: string
  seconds: number
  minutes: number
  score: number
}

export const GameResultsSchema: Schema = new Schema({
  user: { type: String, required: true },
  seconds: { type: Number, required: true },
  minutes: { type: Number, required: true },
  score: { type: Number, required: true },
})

export const GameResult = mongoose.model<IGameResult>('game_result', GameResultsSchema)
