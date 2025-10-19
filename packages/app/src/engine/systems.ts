/**
 * Engine: Systems
 * - Functions that perform an action on Entities.
 */
import { GameWorld, System, SystemPayload } from '../types'

/**
 * Run all systems.
 * - Reducer as each system function call will return the updated GameWorld.
 * @param world - Game World.
 * @param systems - Relevant systems.
 * @returns {GameWorld}
 */
export function runSystems(
  systems: Array<SystemPayload>,
  world: GameWorld
): GameWorld {
  return systems.reduce((currentWorld, { system, params }) => 
    system(currentWorld, params),
    world
  )
}

/**
 * Run one system.
 * @param singleSystem - Specific system to run.
 * @param world - Game World.
 * @returns {GameWorld}
 */
export function runSystem(
  singleSystem: SystemPayload,
  world: GameWorld
): GameWorld {
  const { system, params } = singleSystem
  return system(world, params)
}

/**
 * Create system with optional parameters.
 * @param {System} system - System function.
 * @param {any} [defaultParams] - Default parameters for created system.
 * @returns {System}
 */
export function createSystem(system: System, defaultParams: any): System {
  return (world: GameWorld, params?: any) => {
    const usedParams = params ?? defaultParams
    return system(world, usedParams)
  }
}
