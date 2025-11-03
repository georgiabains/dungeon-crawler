type EntityRenderProps = {
  isParty: boolean,
  isTurn: boolean
}

function EntityActionList({ isParty, isTurn }: EntityRenderProps) {
  if (!isParty || !isTurn) return
  return (
    <menu>
      <li><button type="button">Attack</button></li>
      <li><button type="button">Pass</button></li>
    </menu>
  )
}

export default EntityActionList