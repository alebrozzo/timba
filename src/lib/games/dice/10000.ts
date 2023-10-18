import type { DiceSet } from "$lib/types"
import type { Score } from "../types"

export type OnDiceSelectionCompletedParams = {
  selectedDice: DiceSet[]
  currentRollScore: Score
}

export type OnTurnCompletedParams = {
  currentTotalScore: Score
  currentTurnScore: Score
}

export type GameRules = {
  gameName: string
  onRollCompleted: () => void
  onDiceSelectionCompleted: (params: OnDiceSelectionCompletedParams) => Score
  onTurnCompleted: (params: OnTurnCompletedParams) => Score
}

export const gameRules: GameRules = {
  gameName: "10000",
  onRollCompleted,
  onDiceSelectionCompleted,
  onTurnCompleted,
}

function onRollCompleted() {}

function onDiceSelectionCompleted(params: OnDiceSelectionCompletedParams): Score {
  const { selectedDice, currentRollScore } = params
  return { player: currentRollScore.player, score: currentRollScore.score + 1 }
}

function onTurnCompleted(params: OnTurnCompletedParams): Score {
  const { currentTotalScore, currentTurnScore } = params
  const newTotalScore = {
    player: currentTotalScore.player,
    score: currentTotalScore.score + currentTurnScore.score,
  }
  return newTotalScore
}
