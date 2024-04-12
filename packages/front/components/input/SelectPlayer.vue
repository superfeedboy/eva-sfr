<template>
  <div class="bg-violet-300 rounded-md p-1 justify-center content-center">
    <select v-model="selected" class="bg-transparent min-w-40 text-violet-700">
      <option disabled value="">Choisir un joueur</option>
      <option
        v-for="player in players"
        :key="player.playerid"
        :value="player.playerid"
      >
        {{ player.pseudo }} - {{ player.name }}
      </option>
    </select>
    <Icon name="streamline:magnifying-glass-solid" class="text-white m-1" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useDataStore } from "~/stores/datas.store";

const emit = defineEmits();
const selected = ref("");
const dataStore = useDataStore();
const players = ref(dataStore.datas.playersList);

console.log(players.value);

watch(
  () => selected.value,
  (newValue, oldValue) => {
    console.log("old selection:", oldValue);

    console.log("player selected:", newValue);
    emit("playerSelected", newValue);
  }
);
</script>
