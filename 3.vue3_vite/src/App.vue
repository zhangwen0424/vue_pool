<template>
  <demo @test="showMsg" msg="王二er">
    <template v-slot:a="{ slot_a }">ok</template>
    <template v-slot:b>no</template>
  </demo>
</template>
<script>
import Demo from "./components/Demo.vue";
export default {
  components: { Demo },
  name: "App",
  setup() {
    const slot_a = { test_a: 1 };
    function showMsg() {
      console.log("showMsg");
    }
    return { showMsg, slot_a };
  },
};
</script>
