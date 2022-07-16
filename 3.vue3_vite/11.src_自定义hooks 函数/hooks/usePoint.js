import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
export default function () {
  const x = ref(0);
  const y = ref(0);
  // const point = reactive({
  //   x: 0,
  //   y: 0,
  // });
  function savePoint(e) {
    console.log("e", e.pageX, e.pageY);
    // point.x = e.pageX;
    // point.y = e.pageY;
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener("click", savePoint);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", savePoint);
  });

  // return point;
  return { x, y };
}
