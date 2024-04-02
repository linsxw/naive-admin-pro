import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * 示例store
 */
export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const nickname = ref('')

  const fullName = computed(() => username.value + nickname.value)

  function setName(name: string) {
    username.value = name
  }

  return {
    username,
    nickname,
    fullName,
    setName,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
