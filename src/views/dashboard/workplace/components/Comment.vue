<template>
  <div v-for="item in 6" :key="item" class="flex bg-#f5f7fa dark:bg-dark mb-1 items-center p-2">
    <n-avatar shape="square" src="https://pic.imgdb.cn/item/634f902116f2c2beb11a3cc7.jpg" />
    <div class="ml-2">
      <div class="text-md flex justify-between w-full">
        小伟同学：针不错
      </div>
      <div class="text-xs text-gray-500">
        2024-01-01 12:00
      </div>
    </div>
  </div>
</template>
