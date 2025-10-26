/**
 * Store: Game
 * 
 * Global state management for GameWorld.
 */
import {create} from 'zustand'
import { GameWorld, GameStore, GameStoreComponent } from '../types'
import { Entities, Components } from '../engine/engine'

/**
 * Create global Game Store.
 */
export const useGameStore = create<GameStore>((set) => ({
  world: initGameWorld(),
  updateWorld: (fn: any) => set((state: any) => ({ world: fn(state.world) })),
  addEntityWithComponents: ((components: Array<GameStoreComponent>) => 
    set((state) => ({ world: createManyComponents(state.world, components) }))
  )
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

/**
 * Bulk attribute many components to a specific entity.
 * @param {GameWorld} state - GameWorld.
 * @param {Array<GameStoreComponent>} components - List of components to add.
 * @returns {GameWorld}
 */
function createManyComponents(
  state: GameWorld, 
  components: Array<GameStoreComponent>
): GameWorld {
  const update = Entities.createEntity(state)
  const newEntity = update.entity

  const updatedWorld = components.reduce(
    (world: GameWorld, component: GameStoreComponent) => 
      Components.setComponent(component.name, component.data, newEntity, world),
    update.world,
  )

  return updatedWorld
}