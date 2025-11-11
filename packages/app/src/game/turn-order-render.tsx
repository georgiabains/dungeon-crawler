/**
 * Turn Order
 * 
 * Render turn order that displays a visual for the current entity.
 */
import { ReactElement, useMemo } from "react"
import { Entity } from "../types"
import { useGameStore } from './game-store'

// Utils
import Symbols from "../utils/symbols"

// Custom types
type TurnOrderProps = {
  entities: Array<Entity>,
  id: string,
  turnIndex: number
}

/**
 * Return turn order.
 * @param {TurnOrderProps} data - Turn order data.
 * @param {Array<Entity>} data.entities - List of entities involved.
 * @param {string} data.id - Encounter ID (uuid)
 * @param {number} data.turnIndex - Current turn index.
 * @returns 
 */
function TurnOrderRender({
  entities, 
  id,
  turnIndex = 0
}: TurnOrderProps): ReactElement {
  const getComponent = useGameStore((s) => s.getComponent)
  const namesMap = useMemo(() => getComponent(Symbols.name) as Map<Entity, string>, [id])
  const agilityMap = useMemo(() => getComponent(Symbols.agility) as Map<Entity, number>, [id])

  return (
    <aside>
      <p>Turn order</p>
      <ul>
        {
          entities.map((entity, index) =>
            <li 
              key={entity} 
              style={{ color: turnIndex % entities.length === index ? 'yellow' : 'inherit' }}
            >
              {`${namesMap.get(entity)} | ${agilityMap.get(entity)}`}
            </li>
          )
        }
      </ul>
    </aside>
  )
}

export default TurnOrderRender