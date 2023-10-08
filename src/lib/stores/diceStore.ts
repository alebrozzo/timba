import { writable } from "svelte/store"
import type { DiceSet } from "$lib/types"

export const diceSetStore = writable<DiceSet[]>([])
