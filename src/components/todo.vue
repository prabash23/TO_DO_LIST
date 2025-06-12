<template>
  <div class="container">
    <div class="container__header">
      <h1 class="container__main-title">📝 TodoList</h1>
      <p class="container__head-line">日々のタスクを管理しよう</p>
    </div>
    <div class="add-todo">
      <div class="add-todo__input-group">
        <input
          type="text"
          v-model="newTodo"
          @keyup.enter="addTodo"
          class="add-todo__todo-input"
          placeholder="新しいタスクを入力。。。"
        />
        <button
          @click="addTodo"
          :disabled="!newTodo.trim()"
          class="add-todo__add-btn"
        >
          追加
        </button>
      </div>
    </div>
    <div v-if="todos.length > 0" class="todo-list">
      <div v-for="todo in todos" :key="todo.id" 
      :class="{completed : todo.completed}"
      class="todo-list__todo-item">
        <div 
        :class="{checked : todo.completed}"
        @click="toggleTodo(todo.id)"
        class="todo-list__todo-checkbox"></div>
        <span class="todo-list__todo-text"></span>
        <button class="todo-list__delete-btn">削除</button>
      </div>
    </div>
    <div class="empty-state">
      <h3>📋 タスクがありません</h3>
      <p>新しいタスクを追加してみましょう！</p>
    </div>
    <div class="todo-list__stats">
      <span> 全件 | 完了件 | 未完了件 </span>
      <button class="todo-list__clear-completed">完了済みを削除</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// リアクティブな状態
const newTodo = ref("");
const todos = ref([]);
let nextId = 1;

// タスクを追加
const addTodo = () => {
  const text = newTodo.value.trim();
  if (text) {
    todos.value.push({
      id: nextId++,
      text: text,
      completed: false,
      createdAt: new Date(),
    });
    newTodo.value = "";
  }
};

// タスクの完了状態を切り替え
const toggleTodo = (id) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// タスクを削除
const deleteTodo = (id) => {
  todos.value = todos.value.filter((t) => t.id !== id);
};

// 完了済みタスクを全て削除
const clearCompleted = () => {
  todos.value = todos.value.filter((t) => !t.completed);
};

// 計算プロパティ
const completedCount = computed(() => {
  return todos.value.filter((t) => t.completed).length;
});

const remainingCount = computed(() => {
  return todos.value.filter((t) => !t.completed).length;
});
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 700px;
  max-width: 1100px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__header {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    padding: 30px;
    text-align: center;
    color: white;
  }
  &__main-title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  &__head-line {
    color: black;
    font-size: 1.2rem;
  }
}
.add-todo {
  padding: 30px;
  border-bottom: 1px solid #f0f0f0;

  &__input-group {
    display: flex;
    gap: 10px;
  }
  &__todo-input {
    flex: 1;
    padding: 15px 20px;
    // border: 2px solid #e9ecef;
    border: 2px solid black;
    border-radius: 3px;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
  }
  &__add-btn {
    padding: 15px 15px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 80px;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(79, 172, 254, 0.3);
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
}
.add-input:focus {
  border-color: #4facfe;
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}
.todo-list {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;

  &__todo-item {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid #f8f9fa;
    transition: all 0.3s ease;
    // animation: slideIn 0.3 ease;
    &:hover {
      background: #f8f9fa;
    }
  }
  &__todo-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 50%;
    margin-right: 15px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
  }
  &__todo-text {
    flex: 1;
    font-size: 16px;
    line-height: 1.5;
  }
  &__delete-btn {
    padding: 8px 12px;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    &:hover {
      background: #ff5252;
      opacity: 1;
    }
  }
  &__stats {
    padding: 20px 30px;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #6c757d;
  }
  .__clear-completed {
    padding: 8px 16px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
}
.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.empty-state {
  text-align: center;
  padding: 60px 30px;
  color: #6c757d;
}
.empty-state h3 {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 400;
}
.empty-state p {
  font-size: 10px;
}
.todo-item:hover .delete-btn {
  opacity: 1;
}
.todo-item.completed {
  opacity: 0.6;
  background: #f8f9fa;
  transform: scale(1.05);
}
.todo-text.completed {
  text-decoration: line-through;
  color: #6c757d;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
