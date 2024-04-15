<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { CloudTwotone, LockTwotone, SafetyCertificateOutlined, UserOutlined } from '@vicons/antd'

const router = useRouter()
const route = useRoute()
const message = useMessage()
const formData = ref({
  username: 'admin',
  password: 'admin123',
  code: null,
})

const rules = reactive({
  username: {
    required: true,
    message: '请输入账号',
    trigger: ['input', 'blur'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur'],
  },
  code: {
    required: true,
    message: '请输入验证码',
    trigger: ['input', 'blur'],
  },
})

const redirect = computed(() => (route.query && route.query.redirect) || '/')
const formChecked = ref(true)
const formRef = ref<FormInst | null>(null)
const loading = ref(false)

function handleSubmit(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true
      message.loading('登陆中...')
      setTimeout(() => {
        message.destroyAll()
        loading.value = false
        message.create('登录成功，即将进入系统', {
          type: 'success',
          duration: 1000,
          onAfterLeave() {
            router.push(redirect.value as string)
          },
        })
      }, 500)
    }
  })
}
</script>

<template>
  <div class="login mx-auto">
    <div class="h-screen flex flex-col justify-evenly md:flex-row md:items-center">
      <div class="h-full flex flex-1 flex-col">
        <n-carousel>
          <div class="h-full flex flex-col items-center justify-center pb-5 md:pb-0" style="background-color: #42b8f1">
            <img class="h-[400px] w-[500px]" src="@/assets/image/banner.png" alt="banner">
            <n-el tag="div" class="mb-4 pt-[50px] text-[26px] text-white font-bold">
              极致的用户体验
            </n-el>
            <n-el tag="p" class="text-mini text-white">
              多生态支持、功能丰富、高颜值模板
            </n-el>
          </div>
        </n-carousel>
      </div>
      <div class="relative h-full flex flex-col items-center justify-center p-5 md:w-[50%] md:flex-row md:p-0">
        <div class="w-full flex-1 md:m-auto md:max-w-[420px]">
          <div class="flex flex-col rounded-xl md:m-auto">
            <n-el tag="span" class="m-auto mb-1 flex items-center">
              <n-icon color="var(--primary-color)" size="80">
                <CloudTwotone />
              </n-icon>
            </n-el>
            <n-el tag="div" class="mb-3 text-center text-2xl font-bold">
              Naive Admin Pro
            </n-el>
            <n-el tag="div" class="mb-8 text-center">
              基于Naive UI的后台管理系统
            </n-el>
            <n-form ref="formRef" :show-require-mark="false" :show-label="false" :model="formData" :rules="rules">
              <n-form-item path="username">
                <n-input v-model:value="formData.username" placeholder="请输入账号">
                  <template #prefix>
                    <n-icon color="var(--n-placeholder-color)" size="16">
                      <UserOutlined />
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input v-model:value="formData.password" placeholder="请输入密码" type="password" show-password-on="click">
                  <template #prefix>
                    <n-icon color="var(--n-placeholder-color)" size="14">
                      <LockTwotone />
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="code">
                <n-input v-model:value="formData.code" placeholder="请输入验证码">
                  <template #prefix>
                    <n-icon color="var(--n-placeholder-color)" size="16">
                      <SafetyCertificateOutlined />
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item>
                <div class="w-full flex items-center justify-between">
                  <n-checkbox v-model:checked="formChecked">
                    记住密码
                  </n-checkbox>
                  <n-button text tag="span" type="primary">
                    忘记密码
                  </n-button>
                </div>
              </n-form-item>
            </n-form>
            <n-button class="!h-10" type="primary" :loading="loading" block @click="handleSubmit">
              登陆
            </n-button>
          </div>
        </div>
        <div class="flex pb-5 pt-10 md:absolute md:bottom-[22px] md:left-[50%] md:translate-x-[-50%] md:p-0">
          <n-el tag="div">
            Copyright © 2024 linsxw. All Rights Reserved
          </n-el>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {

  :deep(.n-input),
  :deep(.n-base-selection) {
    height: 40px;
    --n-height: 40px !important;
  }

  :deep(.n-base-selection-label) {
    padding-left: 20px;
  }
}
</style>
