import { Entity } from "../types"

type test = {
  entities: Array<Entity>,
  turnIndex: number
}

function TurnOrderRender({entities, turnIndex}: test) {
  const turnOrder = [...entities].sort((a: Entity, b: Entity) => b.agility! - a.agility!)

  return (
    <>
      <p>Turn order</p>
      <ul>
        {
          turnOrder.map((entity, index) =>
            <li key={entity.id} style={{ color: turnIndex % entities.length === index ? 'yellow' : 'inherit' }}>{entity.name}</li>
          )
        }
      </ul>
    </>
  )
}

export default TurnOrderRender