import { JSX, ReactElement } from 'react'

/**
 * Entity.
 */
export type Entity = string

/**
 * Component.
 */
export type ComponentName = string
export type ComponentData = Map<Entity, unknown> // unknown because a component can be anything

export type Component = {
  name: ComponentName,
  data: ComponentData
}

/**
 * Game World.
 */
export type GameWorld = {
  entities: Array<Entity>,
  components: Map<Component["name"], Component["data"]>,
  newEntity: Entity
}

/**
 * Game Store.
 */
export type GameStoreComponent = {
  name: ComponentName,
  data: any,
}

export type GameStore = {
  world: GameWorld,
  updateWorld: (world: GameWorld) => void,
  addEntityWithComponents: (components: Array<GameStoreComponent>) => void,
  getWorld: () => GameWorld,
  getComponent: (component: string) => any,
}

/**
 * System.
 */
export type System = (world: GameWorld, params?: any) => GameWorld

export type SystemPayload = {
  system: System,
  params?: any
}

/**
 * Other.
 */
export type Encounter = {
  render: JSX.Element | undefined,
  name: string,
  type: string,
  description: string,
}

export type EncounterParam = {
  type: string
}

export type PropsConditionalText = {
  isShow: boolean,
  element: ReactElement
}

export type PropsScreenGameMenu = {
  setGame: Function
  setPlayer?: Function
}

export type Weapon = {
  attack: number,
  name: string,
}
