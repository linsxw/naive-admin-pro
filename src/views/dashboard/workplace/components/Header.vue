<script setup lang="ts">
import { UserOutlined } from '@vicons/antd'
import { useUserStoreRefs } from '@/store/modules/user.ts'

const { username, avatar } = useUserStoreRefs()
</script>

<template>
  <div class="items-center justify-between py-2 md:flex">
    <div class="items-center md:flex">
      <n-avatar
        round
        class="mr-4"
        :size="50"
        :src="avatar"
      />
      <div class="flex flex-col">
        <div class="mb-3 text-[20px]">
          早安，{{ username }}，开始您一天的工作吧！
        </div>
        <n-el tag="div" class="mb-1 flex items-center md:mb-0" :style="{ color: 'var(--text-color-3)' }">
          愿你殊途同归，我能和你讲讲来时的路.
        </n-el>
      </div>
    </div>
    <div class="flex">
      <n-space :size="30">
        <div class="flex flex-col items-end">
          <n-el tag="div" class="mb-1 flex items-center" :style="{ color: 'var(--text-color-3)' }">
            <n-button strong secondary circle size="tiny" type="primary" class="!mr-1">
              <template #icon>
                <n-icon><UserOutlined /></n-icon>
              </template>
            </n-button>
            项目数
          </n-el>
          <div class="text-xl">
            12
          </div>
        </div>
        <div class="flex flex-col items-end">
          <n-el tag="div" class="mb-1" :style="{ color: 'var(--text-color-3)' }">
            <n-button strong secondary circle size="tiny" type="warning" class="!mr-1">
              <template #icon>
                <n-icon><UserOutlined /></n-icon>
              </template>
            </n-button>
            待办项
          </n-el>
          <div class="text-xl">
            3 / 24
          </div>
        </div>
        <div class="flex flex-col items-end">
          <n-el tag="div" class="mb-1" :style="{ color: 'var(--text-color-3)' }">
            <n-button strong secondary circle size="tiny" type="success" class="!mr-1">
              <template #icon>
                <n-icon><UserOutlined /></n-icon>
              </template>
            </n-button>
            积分
          </n-el>
          <div class="text-xl">
            1,689
          </div>
        </div>
      </n-space>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
