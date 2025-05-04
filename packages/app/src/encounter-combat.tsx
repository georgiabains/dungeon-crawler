import { Encounter } from "./types"

function EncounterCombat(encounter: Encounter) {
  return (
    <>
      <p>{encounter.name}</p>
    </>
  )
}

export default EncounterCombat