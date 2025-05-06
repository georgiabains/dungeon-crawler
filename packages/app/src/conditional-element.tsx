import { PropsConditionalText } from "./types"

function ConditionalElement({ isShow, element }: PropsConditionalText) {
  return isShow
    ? <>{element}</>
    : null
}

export default ConditionalElement