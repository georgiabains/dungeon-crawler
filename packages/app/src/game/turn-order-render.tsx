import { Entity, GameWorld } from "../types"
import { getComponent } from "../engine/components"
import Symbols from "../utils/symbols"
import { useGameStore } from './game-store'

type test = {
  entities: Array<Entity>,
  turnIndex: number
}

function TurnOrderRender({entities, turnIndex = 0}: test) {
  const GameWorld = useGameStore((s) => s.world)

  return (
    <>
      <p>Turn order</p>
      <ul>
        {
          entities.map((entity, index) =>
            <li key={entity} style={{ color: turnIndex % entities.length === index ? 'yellow' : 'inherit' }}>
              {`${(getComponent(Symbols.name, GameWorld) as Map<Entity, string>).get(entity)} | ${(getComponent(Symbols.agility, GameWorld) as Map<Entity, string>).get(entity)}`}
            </li>
          )
        }
      </ul>
    </>
  )
}

export default TurnOrderRender