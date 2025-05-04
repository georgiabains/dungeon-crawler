import { Encounter, EncounterParam } from './types'
import encounterData from './encounter-data.json'

function EncounterRender({ type }: EncounterParam) {
  const encounter = getEncounterData(type) as Encounter

  function getEncounterData(type: string) {
    return encounterData[type as keyof typeof encounterData]
  }

  return (
    <>
      <p>{encounter?.name}</p>
      <p>{encounter?.type}</p>
      <p>{encounter?.description}</p>
    </>
  )
}

export default EncounterRender