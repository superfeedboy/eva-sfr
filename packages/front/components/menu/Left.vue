<template>
  <div
    class="menu-left w-60 relative top-0 left-0 h-full flex flex-col gap-2 border-r-2 border-EVAPurple/70 shadow-md shadow-EVAPurple"
  >
    <div class="w-full flex justify-center items-center my-10">
      <img
        src="/images/eva-sfr-logo.png"
        alt="logo"
        class="w-25 h-25 p-8 justify-items-center hover:drop-shadow-2xl"
      />
    </div>
    <div>
      <div
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        class="flex flex-row justify-items-end items-center hover:bg-EVAGrey p-2 pl-4 mb-4 space-x-4 rounded-l-xl cursor-pointer transition-colors duration-300 ease-in-out"
        :class="
          activeDashboard === menuItem.id
            ? 'bg-EVAGrey outline outline-0 outline-EVAGrey border-EVAPurple border-l-4 border-y-0 rounded-l-md shadow-inner shadow-EVAPurple/5'
            : 'bg-transparent'
        "
        @click="updateActiveDashboard(menuItem.id, menuItem.name)"
      >
        <div>
          <Icon :name="menuItem.icon" class="text-white size-8" />
        </div>
        <div>
          <p>{{ menuItem.name }}</p>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-2 flex justify-center content-end w-full text-[#2D2D2D] text-xs cursor-pointer hover:text-EVAPurple transition-colors duration-300 ease-in-out"
    >
      <p>🚀 by SuperFeedBoy</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LeftMenu } from "~/types/Menus.dt";
const props = defineProps({
  activeDashboard: { type: Number, default: 1 },
});

const { activeDashboard } = toRefs(props);
const emit = defineEmits();
const menuItems: LeftMenu = [
  { id: 1, name: "Joueur", icon: "mdi:account" },
  { id: 2, name: "Equipes", icon: "mdi:account-supervisor" },
  { id: 3, name: "Global", icon: "mdi:account-supervisor-circle-outline" },
];

const updateActiveDashboard = (id: number, name: string) => {
  emit("update:activeDashboard", { id: id, name: name });
};
</script>
