<template>


<div>
  <configEth/>

  <ChartDebugger/>
</div>

  
</template>

<script>
import configEth from './components/configEth.vue'
import ChartDebugger from './components/ChartDebugger.vue'

export default {
  name: 'App',
  components: {
    configEth,
    ChartDebugger,
    
}
}
</script>
