/**
 * Engine: Systems
 * - Functions that perform an action on Entities.
 */
import { ComponentName, GameWorld, System, SystemForEntities } from "../types"
import { findEntitiesWithComponents } from "./helpers/helpers";

/**
 * Run all systems.
 * - Reducer as each system function call will return the updated GameWorld.
 * @param world - Game World.
 * @param systems - Relevant systems.
 * @returns {GameWorld}
 */
export function runSystems(
  systems: Array<SystemForEntities>, 
  world: GameWorld
): GameWorld {
  return systems.reduce((currentWorld, { run, entities}) => 
    run(currentWorld, entities), world)
}

/**
 * Create system.
 * - Required components must exist in Game World
 * @param requiredComponents - Components required for system to run.
 * @param system - System function.
 * @returns {SystemBody}
 */
export function createSystem(
  requiredComponents: Array<ComponentName>,
  system: System
): System {
  return (world, entities) => {
    const matchingEntities = entities 
      ?? findEntitiesWithComponents(requiredComponents, world)
    return system(world, matchingEntities)
  }
}
