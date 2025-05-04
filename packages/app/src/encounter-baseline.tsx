import { Encounter } from './types'

function EncounterBaseline(encounter: Encounter) {
  return (
    <>
      <p>{encounter.name}</p>
      <p>{encounter.description}</p>
    </>
  )
}

export default EncounterBaseline