/**
 * Store: Game
 * 
 * Global state management for GameWorld.
 */
import {create} from 'zustand'
import { GameWorld, GameStore } from '../types'

/**
 * Create global Game Store.
 */
export const useGameStore = create<GameStore>((set) => ({
  world: initGameWorld(),
  updateWorld: (fn: any) => set((state: any) => ({ world: fn(state.world) }))
}))

/**
 * Return new Game World.
 * @returns {GameWorld}
 */
function initGameWorld(): GameWorld {
  return {
    entities: [],
    components: new Map(),
    newEntity: crypto.randomUUID(),
  }
}