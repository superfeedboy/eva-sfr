<template>
  <div class="bg-violet-300 rounded-md p-1 justify-center content-center">
    <input
      type="text"
      class="bg-transparent"
      v-model="inputValue"
      @input="handleInput"
    />
    <div class="autocomplete-items" v-if="filteredPlayers.length">
      <div
        class="autocomplete-item"
        v-for="(player, index) in filteredPlayers"
        :key="index"
        @click="selectPlayer(player)"
      >
        {{ player }}
      </div>
    </div>
    <Icon name="streamline:magnifying-glass-solid" class="text-white m-1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDataStore } from "~/stores/datas.store";

const dataStore = useDataStore();
const inputValue = ref("");
const playersList = ref([]);
const filteredPlayers = ref([]);

const handleInput = () => {
  console.log(inputValue.value);
  console.log(playersList.value);
  filteredPlayers.value = playersList.value.filter((player) => {
    console.log(player);

    player.toLowerCase().includes(inputValue.value.toLowerCase());
  });
};

const selectPlayer = (player) => {
  // Mettre à jour la valeur d'entrée avec le joueur sélectionné et vider la liste des suggestions
  inputValue.value = player;
  filteredPlayers.value = [];
};

onMounted(() => {
  playersList.value = dataStore.datas;
  console.log(playersList.value);
});
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete-items {
  position: absolute;
  background-color: white;
  z-index: 99;
}

.autocomplete-item {
  cursor: pointer;
  padding: 10px;
}
</style>
