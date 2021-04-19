<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  /* z-index: 9; */
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
