import { Encounter, EncounterParam } from '../types'
import encounterData from './encounter-data.json'
import EncounterBaseline from './encounter-baseline'
import EncounterCombat from './encounter-combat'

function EncounterRender({ type }: EncounterParam) {
  const encounter = encounterData[type as keyof typeof encounterData] as Encounter

  switch (type) {
    case 'combat':
      return <EncounterCombat {...encounter} />
    default:
      return <EncounterBaseline {...encounter} />
  }
}

export default EncounterRender