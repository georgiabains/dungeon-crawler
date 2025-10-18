/**
 * Engine: Components
 * - All the lovely bits of data for our Entities to have and our Systems to use.
 */
import { ComponentName, ComponentData, GameWorld } from "../types"
type Entity = string // TODO: Replace with import

/**
 * 
 * @param name - Component name.
 * @param data - Component data.
 * @param entity - Entity.
 * @param world - Game world.
 * @returns 
 */
export function setComponent(
  name: ComponentName,
  data: unknown,
  entity: Entity,
  world: GameWorld,
): GameWorld {
  const updatedComponents = new Map(world.components)

  // This allows setComponent to perform both "add" and "update" functions as we 
  // look for a specfic component name with a fallback to creating a new map
  const currentComponentData = updatedComponents.get(name) ?? new Map() as ComponentData

  // TODO: test this with console log
  const newOrUpdatedComponent = new Map(currentComponentData as ComponentData)

  newOrUpdatedComponent.set(entity, data)
  updatedComponents.set(name, newOrUpdatedComponent)

  return {
    ...world,
    components: updatedComponents
  }
}

/**
 * Return component data, if present.
 * @param name - Component name
 * @param world - Game World
 * @returns Component data or false
 */
export function getComponent(
  name: ComponentName, 
  world: GameWorld
): ComponentData | Boolean {
  return world.components.get(name) ?? false
}

