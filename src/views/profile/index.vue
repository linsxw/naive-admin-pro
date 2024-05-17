<script setup lang="ts">
import { useUserStoreRefs } from '@/store/modules/user.ts'

const { username, avatar } = useUserStoreRefs()

const tags = [
  'Vue3',
  'Vite',
  'TypeScript',
  'Naive UI',
  'Tailwind CSS',
  'VitePress',
]
</script>

<template>
  <Container>
    <n-grid x-gap="12" :cols="4">
      <n-gi :span="1">
        <n-card :bordered="false">
          <div class="flex flex-col items-center">
            <n-image class="w-20% rounded-full" :src="avatar" />
            <span class="mt-3 text-base font-bold">{{ username }}</span>
            <span class="text-gray-500">愿你殊途同归，我能和你讲讲来时的路.</span>
          </div>
          <n-divider />
          <div class="space-x-2">
            <n-tag v-for="(tag, index) in tags" :key="index" :bordered="false" size="small" type="primary">
              {{ tag }}
            </n-tag>
          </div>
        </n-card>
      </n-gi>
      <n-gi :span="3">
        <n-card :bordered="false">
          <n-tabs type="line" animated>
            <n-tab-pane name="info" tab="个人信息">
              <n-form>
                <n-form-item label="用户名">
                  <n-input />
                </n-form-item>
                <n-form-item label="昵称">
                  <n-input />
                </n-form-item>
                <n-form-item label="邮箱">
                  <n-input />
                </n-form-item>
                <n-form-item>
                  <n-button type="primary">
                    提交
                  </n-button>
                </n-form-item>
              </n-form>
            </n-tab-pane>
            <n-tab-pane name="changePwd" tab="修改密码">
              <n-form>
                <n-form-item label="旧密码">
                  <n-input />
                </n-form-item>
                <n-form-item label="密码">
                  <n-input />
                </n-form-item>
                <n-form-item label="重复密码">
                  <n-input />
                </n-form-item>
                <n-form-item>
                  <n-button type="primary">
                    提交
                  </n-button>
                </n-form-item>
              </n-form>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-gi>
    </n-grid>
  </Container>
</template>

<style scoped lang="scss">

</style>
