<template>
  <h1>当前鼠标的坐标为：x:{{ point.x }} y:{{ point.y }}</h1>
</template>
<script>
import usePoint from "../hooks/usePoint";
export default {
  name: "Demo",
  setup() {
    const point = usePoint();
    return { point };
  },
};
</script>
