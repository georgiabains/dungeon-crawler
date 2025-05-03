import { JSX } from 'react'

type Encounter = {
  render: JSX.Element | undefined,
  name: string,
  type: string
}

type Entity = {
  isLive: boolean,
  name: string,
  weapon: Weapon
}

type Weapon = {
  attack: number,
  name: string,
}

export type {
  Encounter,
  Entity,
  Weapon
}