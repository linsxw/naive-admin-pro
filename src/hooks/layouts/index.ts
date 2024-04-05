import { acceptHMRUpdate, defineStore } from 'pinia'

const useLayoutsStore = defineStore('layouts', () => {
  const collapsed = ref(false)

  return {
    collapsed,
  }
}, {
  persist: {
    key: 'layouts-store',
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutsStore, import.meta.hot))
}

export {
  useLayoutsStore,
}
