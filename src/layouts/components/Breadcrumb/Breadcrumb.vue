<template>
    <n-breadcrumb>
        <n-breadcrumb-item>
            <n-icon :component="Home" size="16" /> 首页
        </n-breadcrumb-item>
        <n-breadcrumb-item>
            工作台
        </n-breadcrumb-item>
    </n-breadcrumb>
</template>

<script setup lang="ts">
import { Home } from '@vicons/ionicons5'
</script>