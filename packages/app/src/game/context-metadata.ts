/**
 * Context: Metadata
 * 
 * Create context to track Game metadata (ID etc).
 */
import { createContext } from "react"
import { GameMetadata } from "../types"

type MetadataContextType = {
  metadata: GameMetadata,
  setMetadata: React.Dispatch<React.SetStateAction<any>> // TODO: Build object type
}

const MetadataContext = createContext<MetadataContextType>({
  metadata: {} as GameMetadata,
  setMetadata: () => {} // TODO: Build object type
})

export default MetadataContext