/**
 * Helpers.
 * - Helper function for the game engine.
 */
import { ComponentName, GameWorld } from "../../types";

export function findEntitiesWithComponents(
  componentKeys: Array<ComponentName>,
  world: GameWorld
): Array<string> {
  return [...world.entities].filter((id) =>
    componentKeys.every((key) => {
      return world.components.get(key)?.has(id)
    })
  )
}