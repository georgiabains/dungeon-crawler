import { Dispatch, SetStateAction } from "react"
import { EntityOld } from "../types"

type test = {
  entity: EntityOld,
  setTarget?: Dispatch<SetStateAction<EntityOld>>
}

function EntityRender({entity, setTarget }: test) {
  function handleSelectTarget() {
    if (!setTarget) return
    setTarget(entity)
  }
  
  return (
    <>
      <div>{entity.name}</div>
      <div>{entity.health}</div>
      <div>{entity?.weapon?.name}</div>
      {entity?.isLive ? null : 'Dead'}
      {entity?.isSelectable ? <button onClick={handleSelectTarget}>Select target</button> : ''}
    </>
  )
}

export default EntityRender