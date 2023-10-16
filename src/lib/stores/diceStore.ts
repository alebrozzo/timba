import { writable } from "svelte/store"
import type { DiceSet } from "$lib/types"

// it seems I don't really need a store but I'll leave here for reference
export const diceSetStore = writable<DiceSet[]>([])
