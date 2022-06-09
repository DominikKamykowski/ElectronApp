<template>
  <div class="flex m-5">
    <div class="w-1/3">
      <canvas id="canvas_osc_one" width="256" height="255"
              style="width: 256px; height: 255px;" class=""></canvas>
    </div>
    <div class="w-1/3">
      <canvas id="canvas_osc_two" width="256" height="255"
              style="width: 256px; height: 255px;" class=""></canvas>
    </div>
    <div class="w-1/3">
      <canvas id="canvas_osc_three" width="256" height="255"
              style="width: 256px; height: 255px;" class=""></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartDebugger',
  data() {
    return {
      canvas_osc_multi: 1
    }
  },
  methods: {
    fillOscilloscopeData(canvas, data, w, h, startInx, multiplier) {
      canvas.fillStyle = '#ff6';
      canvas.fillRect(0, 0, w, h);

      canvas.beginPath();
      canvas.strokeStyle = "black";
      canvas.moveTo(0, 0);

      let _multiplier = multiplier || 1;
      for (let j = 0; j < h; ++j) {
        let value = data[startInx + j] * _multiplier;
        value = Math.min(value, 255);
        canvas.lineTo(value, j);
      }
      canvas.stroke();
    },
    createCanvas(id) {
      let c = document.getElementById(id)
      return c.getContext("2d")
    },
  },
  mounted() {
    this.canvasOsc1 = this.createCanvas("canvas_osc_one")
    this.canvasOsc2 = this.createCanvas("canvas_osc_two")
    this.canvasOsc3 = this.createCanvas("canvas_osc_three")
    this.emitter.on('data:eth', (data) => {
      if (data[0] == 0)
        this.fillOscilloscopeData(this.canvasOsc1, data, 256, 255, 0, this.canvas_osc_multi)
      else if (data[0] == 1)
        this.fillOscilloscopeData(this.canvasOsc2, data, 256, 255, 0, this.canvas_osc_multi)
      else
        this.fillOscilloscopeData(this.canvasOsc3, data, 256, 255, 0, this.canvas_osc_multi)
    })
  }
}
</script>