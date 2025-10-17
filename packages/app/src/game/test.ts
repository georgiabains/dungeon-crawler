import Symbols from "../utils/symbols"
import { Systems } from "../engine/engine"


export const test = Systems.createSystem([Symbols.attack, Symbols.health], (world, requiredComponents) => {
  console.log(requiredComponents)
  return world;
})