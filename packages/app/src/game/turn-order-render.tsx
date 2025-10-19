import { EntityOld } from "../types"

type test = {
  entities: Array<EntityOld>,
  turnIndex: number
}

function TurnOrderRender({entities, turnIndex}: test) {
  const turnOrder = [...entities].sort((a: EntityOld, b: EntityOld) => b.agility! - a.agility!)

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