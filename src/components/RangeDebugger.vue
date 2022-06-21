<template>
<div class="flex m-5">
    <div class="w-1/6 grid grid-rows-2 grid-flow-col gap-2">
      <input v-model="startByteNo" class="" placeholder="Bajt od" type="number">
      <input v-model="endByteNo" class="" placeholder="Bajt do" type="number">
    </div>
    <textarea v-model="byte_data" class="w-4/6 m-2" disabled="disabled"></textarea>
    <div class="flex justify-center w-1/6">
      <button v-show="isEnabled" @click="isEnabled=!isEnabled" type="button"
              class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
        ON
      </button>
      <button v-show="!isEnabled" @click="isEnabled=!isEnabled" type="button"
              class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
        OFF
      </button>
    </div>
</div>
</template>

<script>
export default {
  name: 'RangeDebugger',
  data() {
    return {
        startByteNo: "",
        endByteNo: "",
        byte_data: [],
        isEnabled: false

        }
  },

  methods: {
    changeEnabled: function(){
        if(this.isEnabled){
            this.isEnabled = false
        }else{
            this.isEnabled = true
        }
    },

  },

  mounted() {
    this.emitter.on('data:eth', (data) => {
        if(this.isEnabled){
            this.byte_data = data.slice(this.startByteNo, this.endByteNo +1);
        }
        
    })
  }
}
</script>