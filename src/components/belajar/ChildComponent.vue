<template>
  <h3>{{ description }}</h3>
  <button @click="pressMe">Klik Saya</button>
</template>

<script>
import { computed, toRefs } from "vue";
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { product } = toRefs(props);

    const description = computed(() => {
      return `name: ${product.value.name}, price: ${product.value.price}`;
    });

    const pressMe = () => {
      emit("pressMe", "Ini berasal dari child");
    };

    // console.log("attrs");
    // console.log(attrs);
    // console.log("slots");
    // console.log(slots);

    return { pressMe, description };
  },
};
</script>

<style></style>
