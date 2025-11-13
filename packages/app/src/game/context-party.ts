/**
 * Context: Party
 * 
 * Create context to track party data.
 */
import { createContext } from "react"
import { Entity } from "../types"

type PartyContextType = {
  party: Array<Entity>,
  setParty: React.Dispatch<React.SetStateAction<Array<Entity>>>
}

const PartyContext = createContext<PartyContextType>({
  party: [] as Array<Entity>,
  setParty: () => []
})

export default PartyContext