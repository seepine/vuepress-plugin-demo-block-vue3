<template>
  <button>按钮</button>
  <button>{{btnText}}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const btnText = ref('hello world')
</script>

<style>
</style>