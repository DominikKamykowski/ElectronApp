<template>
<div class="flex m-5">
  <div class="w-1/3 h-12 mr-1">
      <input
          class="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-100"
          type="text" v-model="ip" placeholder="IP">
    </div>
    <div class="w-1/3 h-10">
      <input
          class="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-100"
          type="number" v-model="port" placeholder="PORT">
    </div>

    <div class="w-1/3 h-12 p-1 content-center">
      <button v-show="isEnabled" @click="toggleETH" type="button"
              class="inline-block mr-1 px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
        ON
      </button>
      <button v-show="!isEnabled" @click="toggleETH" type="button"
              class="inline-block mr-1 px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
        OFF
      </button>
      <button @click="reloadETH" type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">

        Reload ETH
      </button>
    </div>
</div>
</template>

<script>
export default {
  name: 'configEth',
  data() {
    return {
      ip: "127.0.0.1",
      port: "12345",
      isEnabled: true
    }
  },

  methods: {
    reloadETH: async function(){
        const status = await window.electronAPI.reloadETH({
        ip: this.ip,
        port: this.port,
      });
      console.log(status);
    
    },

  },
  mounted() {
    window.electronAPI.handleDataETH((_event, value) => {
      this.emitter.emit("data:eth", value);
      // console.log(value);
    });
  },

}
</script>

