/**
 * Engine: Entity
 * - Numerical representation for any distinct "item", "character" etc. in the
 *   game.
 */
import { GameState } from "../types"

type Entity = string // TODO: move to types.ts

/**
 * Return updated game state with new entity.
 * @param state - Game state.
 * @returns Array<GameState, Entity>
 */
export function createEntity(currentState: GameState): { 
  state: GameState, 
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