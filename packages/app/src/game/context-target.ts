/**
 * Context: Target Context
 * 
 * Create context to track what Entities an ability targets.
 */

import { createContext } from "react"

type TargetContextType = {
  target: Array<string>
  setTarget: React.Dispatch<React.SetStateAction<Array<string>>>
}

const TargetContext = createContext<TargetContextType>({
  target: [] as Array<string>,
  setTarget: () => {}
})

export default TargetContext