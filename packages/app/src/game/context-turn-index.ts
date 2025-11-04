/**
 * Context: Turn Index
 * 
 * Create context for a combat encounter's turn index.
 */

import { createContext } from "react"

const TurnIndexContext = createContext({
  turnIndex: 0,
  setTurnIndex: (_index: number) => {}
})

export default TurnIndexContext