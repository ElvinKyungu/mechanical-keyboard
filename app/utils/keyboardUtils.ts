export const keyboardUtils = {
  // Color mappings for different macro types
  colorMap: {
    orange: '#f97316',
    red: '#ef4444',
    yellow: '#eab308', 
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7'
  },
  
  // Key size multipliers
  sizeMap: {
    small: 1.33,
    medium: 1.65,
    large: 1.98,
    xlarge: 2.62,
    spacebar: 7.8
  },
  
  // Calculate distance between two points
  calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
  },
  
  // Get the center point of an element
  getElementCenter(element: HTMLElement): { x: number; y: number } {
    const rect = element.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  },
  
  // Generate wave timing based on distance
  calculateWaveTiming(distance: number, waveSpeed: number = 1): number {
    return distance * waveSpeed
  },
  
  // Validate key code format
  isValidKeyCode(code: string): boolean {
    return /^(Key[A-Z]|Digit\d|Arrow(Up|Down|Left|Right)|Space|Enter|Shift(Left|Right)|Control(Left|Right)|Alt(Left|Right)|Meta(Left|Right)|Tab|CapsLock|Escape|Backspace|Delete|Home|End|PageUp|PageDown)$/.test(code)
  },
  
  // Get key display name
  getKeyDisplayName(code: string): string {
    const displayMap: { [key: string]: string } = {
      'Space': '⎵',
      'Enter': '⏎',
      'Tab': '⇥',
      'Shift': '⇧',
      'Control': 'Ctrl',
      'Alt': 'Alt',
      'Meta': 'Win',
      'ArrowUp': '↑',
      'ArrowDown': '↓',
      'ArrowLeft': '←',
      'ArrowRight': '→',
      'Backspace': '⌫',
      'Delete': '⌦',
      'Escape': 'Esc'
    }
    
    return displayMap[code] || code.replace(/^Key/, '').replace(/^Digit/, '')
  },
  
  // Performance optimization helpers
  throttle<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | null = null
    let previous = 0
    
    return ((...args: Parameters<T>) => {
      const now = Date.now()
      const remaining = wait - (now - previous)
      
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        func.apply(null, args)
      } else if (!timeout) {
        timeout = setTimeout(() => {
          previous = Date.now()
          timeout = null
          func.apply(null, args)
        }, remaining)
      }
    }) as T
  },
  
  debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | null = null
    
    return ((...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(null, args), wait)
    }) as T
  }
}