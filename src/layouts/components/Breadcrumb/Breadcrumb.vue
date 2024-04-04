<template>
    <n-breadcrumb>
        <n-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
            {{ item.title }}
        </n-breadcrumb-item>
    </n-breadcrumb>
</template>

<script setup lang="ts">
const router = useRouter()

const getTitle = (title?: string | Record<string, string>) => {
    if (typeof title === 'string') {
        return title
    }
    //暂时设置中文
    return title && title['zh_CN']
}

const breadcrumb = computed(() => router.currentRoute.value.matched.map((item) => ({
    name: item.name,
    path: item.path,
    title: getTitle(item.meta.title),
    icon: item.meta.icon
})).filter(item => item.title))
</script>