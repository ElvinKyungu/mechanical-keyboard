export interface KeyboardKey {
  code: string
  label?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'spacebar'
  color?: string
  macro?: string
  row: number
  column: number
}

export interface KeyboardLayout {
  rows: KeyboardKey[][]
}

export interface WaveAnimation {
  id: string
  startTime: number
  color: string
  macro: string
  origin: { x: number; y: number }
  maxDistance: number
}

export interface KeyboardState {
  pressedKeys: Set<string>
  activeAnimations: WaveAnimation[]
  rotation: { x: number; y: number }
  capsLockActive: boolean
}