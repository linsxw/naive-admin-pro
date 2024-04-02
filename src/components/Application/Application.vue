<template>
  <n-dialog-provider>
    <n-notification-provider>
      <n-message-provider>
        <slot name="default" />
      </n-message-provider>
    </n-notification-provider>
  </n-dialog-provider>
</template>
