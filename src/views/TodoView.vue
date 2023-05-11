<template>
  <div class="container mt-2">
    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <h1>Simple Todolist</h1>
        </div>
        <div class="row">
          <div class="col-10">
            <input
              type="text"
              class="form-control"
              v-model="todo"
              @keyup.enter="add" />
          </div>
          <div class="col-2">
            <button class="btn btn-success" @click="add">ADD</button>
          </div>
        </div>
        <h5 class="mt-3">Todo: {{ count }}</h5>
        <transition-group name="bounce">
          <h2 v-if="loading">Loading...</h2>
          <h2 v-if="data.length == 0 && loading == false">Empty data</h2>
        </transition-group>
        <List :data="data" @deleteTodo="deleteTodo" @setTodo="setTodo" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, ref, toRefs } from "vue";
import List from "../components/todo/List.vue";

export default {
  components: {
    List,
  },
  setup() {
    // Data
    const todo = ref("");
    const todos = reactive({
      data: [],
    });
    const loading = ref(true);

    onMounted(() => {
      setTimeout(() => {
        const items = localStorage.getItem("todos");
        todos.data = items ? JSON.parse(items) : [];
        loading.value = false;
      }, 1000);
    });

    // Computed
    const count = computed(() => todos.data.length);

    // Methods
    const add = () => {
      todos.data.unshift({
        activity: todo.value,
        status: false,
      });
      todo.value = "";

      saveToLocalStorage();
    };

    const deleteTodo = (todoIndex) => {
      todos.data = todos.data.filter((todo, index) => {
        if (todoIndex != index) {
          return todo;
        }
      });

      saveToLocalStorage();
    };

    const setTodo = (todoIndex) => {
      todos.data = todos.data.filter((todo, index) => {
        if (todoIndex == index) {
          todo.status ? (todo.status = false) : (todo.status = true);
        }

        return todo;
      });

      saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
      localStorage.setItem("todos", JSON.stringify(todos.data));
    };

    return { todo, ...toRefs(todos), count, add, deleteTodo, setTodo, loading };
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
