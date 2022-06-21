<template>
  <div class="flex m-5"></div>
</template>

<script>
export default {
  name: "ConfigRS232",
  data() {
    return {
      isEnabled: true,
    };
  },

  methods: {
    getCOMSRS232: async function () {
      let availableComs = await window.electronAPI.getCOMS();
      alert(availableComs);
      console.log(availableComs)
    },
  },
  mounted() {
    this.getCOMSRS232();
  },
};
</script>

