import { reactive, readonly } from 'vue'

const state = reactive({
  events: {}
})

const emit = (event, data) => {
  if (state.events[event]) {
    state.events[event].forEach(callback => callback(data))
  }
}

const on = (event, callback) => {
  if (!state.events[event]) {
    state.events[event] = []
  }
  state.events[event].push(callback)
}

const off = (event, callback) => {
  if (state.events[event]) {
    const index = state.events[event].indexOf(callback)
    if (index > -1) {
      state.events[event].splice(index, 1)
    }
  }
}

export const eventBus = readonly({ on, off, emit })
