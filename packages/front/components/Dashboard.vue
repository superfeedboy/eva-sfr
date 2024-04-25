<template>
  <div
    v-if="isLoading"
    class="absolute t-0 l-0 w-full h-full grid gap-2 place-content-center border-2 border-EVAPurple/20 shadow-inner shadow-EVAPurple/5"
  >
    <LoadingPage />
  </div>
  <div v-else class="flex flex-row h-screen">
    <MenuLeft
      :activeDashboard="activeDashboard.id"
      @update:activeDashboard="handleActiveDashboardUpdate"
    />
    <Stats :dashboardType="activeDashboard.name" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useDataStore } from "../stores/datas.store";

import type { Dashboard } from "../types/Dashboard.dt";

const activeDashboard: Ref<Dashboard> = ref({ id: 1, name: "Joueur" });
const dataStore = useDataStore();
const { isLoading } = toRefs(dataStore);

const handleActiveDashboardUpdate = (newActiveDashboard: Dashboard): void => {
  activeDashboard.value = newActiveDashboard;
};

onMounted(async (): Promise<void> => {
  try {
    await dataStore.getDatas();
  } catch (error) {
    console.error(error);
  }
});
</script>
