import { useState } from 'react'
import * as wasm from '../../wasm/pkg'

export default function Class() {
  const [selectedClass, setSelectedClass] = useState('')

  function initClass(className) {
    if (!className) {
      return
    }

    const customClass = wasm.Class.new(className)
    console.log(customClass)

    return (
      <strong>{className}</strong>
    )
  }

  return (
    <>
      <h2>Class</h2>

      <label htmlFor="class-select">Select your class</label>

      <select 
        id="class-select" 
        value={selectedClass}
        onChange={e => setSelectedClass(e.target.value)}
      >
        <option value="Mage">Mage</option>
        <option value="Thief">Thief</option>
        <option value="Warrior">Warrior</option>
      </select>

      <p>Your class: {initClass(selectedClass)}</p>
    </>
  )
}