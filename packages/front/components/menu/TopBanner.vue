import { Score } from '@api/models/Scores';
<template>
  <div
    class="w-full h-14 bg-EVAPurple flex justify-between items-center px-4 outline outline-2 outline-EVAPurple"
  >
    <div class="flex items-center">
      <Icon name="uim:graph-bar" class="text-white mr-2" />
      <h1>Statistiques {{ dashboardType }}</h1>
    </div>
    <!-- <InputAutocomplete /> -->
    <InputSelectPlayer @playerSelected="handlePlayerSelection" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  dashboardType: String,
});

const { dashboardType } = toRefs(props);
const emit = defineEmits();

const handlePlayerSelection = (playerId: number) => {
  emit("playerSelected", playerId);
};
</script>
