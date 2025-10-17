/**
 * Engine: Entity
 * - Numerical representation for any distinct "item", "character" etc. in the
 *   game.
 */
import { GameWorld } from "../types"

type Entity = string // TODO: move to types.ts

/**
 * Return updated game state with new entity.
 * @param state - Game state.
 * @returns Array<GameWorld, Entity>
 */
export function createEntity(currentState: GameWorld): { 
  state: GameWorld, 
  entity: Entity
} {
  const entity = currentState.newEntityId
  const entities = new Set(currentState.entities).add(entity)

  return {
    state: {
      ...currentState,
      newEntityId: crypto.randomUUID(),
      entities
    },
    entity
  }
}