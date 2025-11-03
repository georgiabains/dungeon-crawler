import { useEffect, useState } from "react"
import { Encounter, EncounterParam, Entity } from '../types'
import encounterData from './data/encounter-data.json'
import EncounterBaseline from './encounter-baseline'
import EncounterCombat from './encounter-combat'
import Symbols from "../utils/symbols"
import { useGameStore } from './game-store'
import { getComponent } from "../engine/components"

function EncounterRender({ type }: EncounterParam) {
  const encounter = encounterData[type as keyof typeof encounterData] as Encounter

  const addEntityWithComponents = useGameStore((s) => s.addEntityWithComponents)
  const getWorld = useGameStore((s) => s.getWorld)
  const [hasEnemyList, setHasEnemyList] = useState(false)
  const enemyNames = ['Goblin Swordsman', 'Goblin Healer', 'Goblin Wizard', 'Goblin Rogue']
  const [enemyList, setEnemyList] = useState([] as Array<Entity>)

  useEffect(() => {
    if (hasEnemyList) return

    enemyNames.forEach((name) => {
      addEntityWithComponents([
        { name: Symbols.name, data: name},
        { name: Symbols.health.current, data: 100 }, 
        { name: Symbols.health.max, data: 100 }, 
        { name: Symbols.attack, data: 5 },
        { name: Symbols.agility, data: Math.floor(Math.random() * 100)},
        { name: Symbols.currentEncounter, data: true}
      ])
      setHasEnemyList(true)
    })
  }, [])

  const enemyComponent = getComponent(Symbols.currentEncounter, getWorld()) as Map<Entity, boolean>

  useEffect(() => {
    if (!enemyComponent) return

    setEnemyList([...enemyComponent.keys()])
  }, [enemyComponent])

  switch (type) {
    case 'combat':
      return <EncounterCombat encounter={encounter} enemyList={enemyList} />
    default:
      return <EncounterBaseline {...encounter} />
  }
}

export default EncounterRender