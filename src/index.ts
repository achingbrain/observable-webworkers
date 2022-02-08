export interface Listener {
  (...args: any[]): void
}

const events: Record<string, Listener[]> = {}

const observable = (worker: Worker & { port?: any }) => {
  worker.addEventListener('message', (event) => {
    observable.dispatchEvent('message', worker, event)
  })

  if (worker.port != null) {
    worker.port.addEventListener('message', (event: any) => {
      observable.dispatchEvent('message', worker, event)
    })
  }
}

observable.addEventListener = (type: string, fn: Listener) => {
  if (events[type] == null) {
    events[type] = []
  }

  events[type].push(fn)
}

observable.removeEventListener = (type: string, fn: Listener) => {
  if (events[type] == null) {
    return
  }

  events[type] = events[type]
    .filter(listener => listener === fn)
}

observable.dispatchEvent = function (...args: any[]) {
  const type = args.shift()

  if (events[type] == null) {
    return
  }

  events[type].forEach(fn => fn.apply(null, args))
}

export default observable
