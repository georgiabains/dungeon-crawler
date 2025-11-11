/**
 * Context: Target Context
 * 
 * Create context to track what Entities an ability targets.
 */
import { createContext } from "react"

type TargetContextType = {
  target: Array<string>
  setTarget: React.Dispatch<React.SetStateAction<Array<string>>>,
  payload: any, // TODO: Build object type
  setPayload: React.Dispatch<React.SetStateAction<any>> // TODO: Build object type
}

const TargetContext = createContext<TargetContextType>({
  target: [] as Array<string>,
  setTarget: () => {},
  payload: {} as any, // TODO: Build object type
  setPayload: () => {} // TODO: Build object type
})

export default TargetContext