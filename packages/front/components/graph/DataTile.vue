<template>
  <div class="h-24 bg-gradient-to-t from-EVAPurple rounded-xl p-4">
    <h1 class="text-md bold">{{ title }}</h1>
    <div class="w-full text-center pt-0">
      <span class="text-xl md:text-3xl xl:text-5xl w-full">{{ data }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  title: String,
  data: [Number, String],
});
const { title, data } = toRefs(props);
</script>
