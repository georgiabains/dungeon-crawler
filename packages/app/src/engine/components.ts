/**
 * Engine: Components
 * - All the lovely bits of data for our Entities to have and our Systems to use.
 */
import { ComponentName, ComponentData, GameState } from "../types"
type Entity = string // TODO: Replace with import

/**
 * 
 * @param name - Component name.
 * @param data - Component data.
 * @param entity - Entity.
 * @param state - Game state.
 * @returns 
 */
export function setComponent(
  name: ComponentName,
  data: unknown,
  entity: Entity,
  state: GameState,
): GameState {
  const updatedComponents = new Map(state.components)

  // This allows setComponent to perform both "add" and "update" functions as we 
  // look for a specfic component name with a fallback to creating a new map
  const currentComponentData = updatedComponents.get(name) ?? new Map() as ComponentData

  // TODO: test this with console log
  const newOrUpdatedComponent = new Map(currentComponentData as ComponentData)

  newOrUpdatedComponent.set(entity, data)
  updatedComponents.set(name, newOrUpdatedComponent)

  return {
    ...state,
    components: updatedComponents
  }
}

/**
 * Return component data, if present.
 * @param name - Component name
 * @param state - Game State
 * @returns Component data or false
 */
export function getComponent(
  name: ComponentName, 
  state: GameState
): ComponentData | Boolean {
  return state.components.get(name) ?? false
}

