<template>


<div>
  <configEth/>
 <hr/>
 <!-- <ConfigRS232></ConfigRS232> -->
 <hr/>
  <ChartDebugger/>
 <hr/>

  <RangeDebugger/>
  <hr/>
  <ByteDebugger/>
  <hr/>

</div>

  
</template>

<script>
import configEth from './components/configEth.vue'
import ChartDebugger from './components/ChartDebugger.vue'
import RangeDebugger from './components/RangeDebugger.vue'
import ByteDebugger from './components/ByteDebugger.vue'
// import ConfigRS232 from './components/ConfigRS232.vue'

export default {
  name: 'App',
  components: {
    configEth,
    ChartDebugger,
    RangeDebugger,
    ByteDebugger,
    // ConfigRS232
}
}
</script>
