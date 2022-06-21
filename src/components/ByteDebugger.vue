<template>
  <div class="flex m-5">
    <div class="w-1/6 grid grid-rows-2 grid-flow-col gap-2">
      <input
        v-model="byteToCheck"
        class=""
        placeholder="Bajt do sprawdzenia"
        type="number"
      />
    </div>

    <canvas
      id="canvas_byte"
      width="280"
      height="255"
      class="w-4/6"
      style="height: 255px"
    ></canvas>

    <div class="flex justify-center w-1/6">
      <button
        v-show="isEnabled"
        @click="isEnabled = !isEnabled"
        type="button"
        class="
          inline-block
          px-6
          py-2.5
          bg-green-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-green-600 hover:shadow-lg
          focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-700 active:shadow-lg
          transition
          duration-150
          ease-in-out
        "
      >
        ON
      </button>
      <button
        v-show="!isEnabled"
        @click="isEnabled = !isEnabled"
        type="button"
        class="
          inline-block
          px-6
          py-2.5
          bg-gray-200
          text-gray-700
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-gray-300 hover:shadow-lg
          focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-gray-400 active:shadow-lg
          transition
          duration-150
          ease-in-out
        "
      >
        OFF
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ByteDebugger",
  data() {
    return {
      byteToCheck: "",
      isEnabled: false,
    };
  },
  mounted() {
    this.queue = [];


    this.canvas = document.getElementById("canvas_byte")
    this.canvasContext = this.canvas.getContext("2d")



    this.emitter.on("data:eth", (data) => {
      //dostajemy dane i sprawdzamy czy mamy co analizowac czy nie
      if (this.byteToCheck !== "" && this.isEnabled) {
        // pakujemy dane do kolejki
        this.queue.push(data[this.byteToCheck]);
        // sprawdzamy czy kolejka sie nie przepelnila
        if (this.queue.length > 256) {
          // jezeli tak to obcinamy najstarsze dane
          this.queue.shift();
        }

        this.canvasContext.fillStyle = 'red';
        this.canvasContext.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        // this.canvasContext.beginPath(); // rozpoczyna rysowanie
        // this.canvasContext.strokeStyle = "white";
        // this.canvasContext.moveTo(inx,value);// przesuniecie po canvas
        // this.canvasContext.lineTo(inx,value);// linia od poprzedniego do obecnego
        // this.canvas.stroke(); // konczy rysowac


        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle = "black";
        // this.canvasContext.moveTo(0, 0);

        for (let j = 0; j < this.queue.length; ++j) {
        let value = this.queue[j];
        value = Math.min(value, 255);
        this.canvasContext.lineTo(j, value);
         }
        this.canvasContext.stroke();

        //tutaj sa przygotowane do wyrysowania
        // console.log(this.queue.length);
      }
    });
  },
};
</script>