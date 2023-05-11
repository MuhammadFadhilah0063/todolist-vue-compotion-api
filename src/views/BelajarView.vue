<template>
  <div>
    <h1>{{ title }}</h1>
    <h3>Name: {{ name }}</h3>
    <h3>Age: {{ age }}</h3>
  </div>
  <button @click="changeUser">Change User</button>
  <br />
  <br />

  <div>
    <h2>Belanja: {{ belanja }}</h2>
    <h2>
      <span>Discount: {{ discount }}</span>
    </h2>
    <button @click="kurangDiscount">Kurangi discount 1.500</button>
    <h2>Total: {{ resultDiscount }}</h2>
  </div>
  <br />

  <!-- Child -->
  <ChildComponent
    :product="product"
    iniAttr="ini adalah attribute"
    @pressMe="onPressMe">
    <h1>Ini Slot</h1>
  </ChildComponent>
</template>

<script>
import { computed, reactive, ref, toRefs, watch, watchEffect } from "vue";
import ChildComponent from "../components/belajar/ChildComponent.vue";

export default {
  components: {
    ChildComponent,
  },
  setup() {
    // Data
    const title = ref("Biodata");
    const user = reactive({
      name: "Budiman",
      age: 21,
    });
    const product = reactive({
      name: "Susu UHT Indomilk",
      price: 5500,
    });

    const belanja = ref(12500);
    const discount = ref(3000);

    // Computed
    const resultDiscount = computed({
      get: () => belanja.value - discount.value,
      set: (val) => {
        discount.value = val;
      },
    });

    // Methods
    const changeUser = () => {
      user.name = "Fadhilah";
      user.age = 22;
    };

    const kurangDiscount = () => {
      resultDiscount.value = 1500;
    };

    const onPressMe = (value) => {
      console.log(value);
    };

    // Watch and WatchEffect
    watchEffect(
      () => {
        // console.log(discount.value);
      }
      //   {
      //     flush: "post",
      //     onTrigger: (e) => {
      //       console.log("ini trigger:");
      //       console.log(e);
      //     },
      //     onTrack: (e) => {
      //       console.log("ini track:");
      //       console.log(e);
      //     },
      //   }
    );

    watch(discount, (after, before) => {
      //   console.log(discount.value);
      //   console.log("before:" + before);
      //   console.log("after:" + after);
    });

    watch(
      () => user.name,
      (before, after) => {
        // console.log(user.name);
        // console.log("before:" + before);
        // console.log("after:" + after);
      }
    );

    watch([discount, resultDiscount], (before, after) => {
      console.log(discount.value);
      console.log(resultDiscount.value);
      console.log(before);
      console.log(after);
    });

    return {
      title,
      ...toRefs(user),
      changeUser,
      belanja,
      discount,
      kurangDiscount,
      resultDiscount,
      onPressMe,
      product,
    };
  },
};
</script>

<style></style>
