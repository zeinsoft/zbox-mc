<template>

</template>

<script>
  export default {
    name: "PolicySetting",
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "정책설정");

    },
  }
</script>

<style scoped>

</style>
