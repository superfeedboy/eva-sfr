<template>
  <div class="flex w-full justify-center">
    <img
      v-if="logo !== false"
      src="/images/eva-sfr-logo.png"
      alt="logo"
      class="w-64 h-64 p-0 hover:drop-shadow-2xl animate-pulse"
    />
  </div>
  <BubbleLoader class="text-EVAPurple justify-center" />
  <div class="text-center text-xl">
    <h1 v-if="info">{{ info }}</h1>
    <h1 v-else>Chargement...</h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  info: String,
  logo: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const { info } = toRefs(props);
</script>
