import { defineStore } from "pinia";

export const useGraphsStore = defineStore("graphs", () => {
  const graphs = ref({});
  const isLoading = ref(true);

  const moveGraph = async (
    graphId: string,
    series: object | Array<object | string>,
    options: object | null = null
  ): Promise<void> => {
    // console.log("GraphId: ", graphId);
    // console.log("Options: ", options);
    // console.log("Series: ", series);
    graphs.value[graphId] = { series: series, options: options };
  };

  return { graphs, isLoading, moveGraph };
});
