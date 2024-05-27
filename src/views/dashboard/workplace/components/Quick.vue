<template>
  <div class="grid grid-cols-4 gap-1">
    <div v-for="item in 8" :key="item" class="flex justify-center items-center flex-col space-y-2 bg-#f5f7fa dark:bg-dark p-2 cursor-pointer rounded-1 hover:shadow">
      <n-avatar size="small" shape="square" src="https://pic.imgdb.cn/item/634f902116f2c2beb11a3cc7.jpg" />
      <div>系统管理</div>
    </div>
  </div>
</template>
