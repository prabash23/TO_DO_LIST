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
          <span 
          :class="{completed : todo.completed}"
          class="todo-list__todo-text">{{ todo.text }}</span>
          <button 
          @click="deleteTodo(todo.id)"
          class="todo-list__delete-btn">削除</button>
        </div>
      </div>
      <div v-else class="empty-state">
        <h3>📋 タスクがありません</h3>
        <p>新しいタスクを追加してみましょう！</p>
      </div>
      <div v-if="todos.length > 0" class="todo-list__stats">
          <span>
          全{{ todos.length }}件 | 
          完了{{ completedCount }}件 | 
          未完了{{ remainingCount }}件
        </span>
        <button 
        @click="clearCompleted"
        :disabled="completedCount === 0"
        class="todo-list__clear-completed">完了済みを削除</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // リアクティブな状態
  const newTodo = ref('')
  const todos = ref([])
  let nextId = 1
  
  // タスクを追加
  const addTodo = () => {
    const text = newTodo.value.trim()
    if (text) {
      todos.value.push({
        id: nextId++,
        text: text,
        completed: false,
        createdAt: new Date()
      })
      newTodo.value = ''
    }
  }
  
  // タスクの完了状態を切り替え
  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
  
  // タスクを削除
  const deleteTodo = (id) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }
  
  // 完了済みタスクを全て削除
  const clearCompleted = () => {
    todos.value = todos.value.filter(t => !t.completed)
  }
  
  // 計算プロパティ
  const completedCount = computed(() => {
    return todos.value.filter(t => t.completed).length
  })
  
  const remainingCount = computed(() => {
    return todos.value.filter(t => !t.completed).length
  })
  </script>
  
  <style lang="scss" scoped>
  .container {
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative; 
  
    @include g.sm {
      min-width: 700px;
      max-width: 1100px;
      max-height: calc(100vh - 180px);
      display: flex;
      flex-direction: column;
    }
  
    @include g.xs {
      min-width: auto;
      max-width: none;
      width: 100%;
      margin: 0;
      border-radius: 15px;
      max-height: calc(100vh - 120px);
      display: flex;
      flex-direction: column;
    }
  
    &__header {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      text-align: center;
      color: white;
      flex-shrink: 0; 
  
      @include g.sm {
        padding: 30px;
      }
  
      @include g.xs {
        padding: 20px;
      }
    }
  
    &__main-title {
      font-weight: 600;
      margin-bottom: 10px;
  
      @include g.sm {
        font-size: 2.5rem;
      }
  
      @include g.xs {
        font-size: 2rem;
      }
    }
  
    &__head-line {
      color: white;
  
      @include g.sm {
        font-size: 1.2rem;
      }
  
      @include g.xs {
        font-size: 1rem;
      }
    }
  }
  
  .add-todo {
    border-bottom: 1px solid #f0f0f0;
    flex-shrink: 0; 
  
    @include g.sm {
      padding: 30px;
    }
  
    @include g.xs {
      padding: 20px;
    }
  
    &__input-group {
      display: flex;
      gap: 10px;
  
      @include g.xs {
        flex-direction: column;
        gap: 15px;
      }
    }
  
    &__todo-input {
      flex: 1;
      padding: 15px 20px;
      border: 2px solid black;
      border-radius: 3px;
      font-size: 16px;
      outline: none;
      transition: all 0.3s ease;
  
      &:focus {
        border-color: #4facfe;
        box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
      }
  
      @include g.xs {
        width: 100%;
      }
    }
  
    &__add-btn {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
  
      @include g.sm {
        padding: 15px 25px;
        min-width: 80px;
      }
  
      @include g.xs {
        padding: 15px 20px;
        width: 100%;
      }
  
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
  
  .todo-list {
    flex: 1;
    overflow-y: auto; 
    min-height: 0; 
  
  
    &__todo-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f8f9fa;
      transition: all 0.3s ease;
      animation: slideIn 0.3s ease;
  
      @include g.sm {
        padding: 20px 30px;
      }
  
      @include g.xs {
        padding: 15px 20px;
      }
  
      &:hover {
        background: #f8f9fa;
  
        .todo-list__delete-btn {
          opacity: 1;
        }
      }
  
      &.completed {
        opacity: 0.6;
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
      flex-shrink: 0;
  
      @include g.xs {
        width: 18px;
        height: 18px;
        margin-right: 12px;
      }
  
      &.checked {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        border-color: #4facfe;
  
        &::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
  
          @include g.xs {
            font-size: 10px;
          }
        }
      }
    }
  
    &__todo-text {
      flex: 1;
      line-height: 1.5;
      word-break: break-word;
  
      @include g.sm {
        font-size: 16px;
      }
  
      @include g.xs {
        font-size: 14px;
      }
  
      &.completed {
        text-decoration: line-through;
        color: #6c757d;
      }
    }
  
    &__delete-btn {
      background: #ff6b6b;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      flex-shrink: 0;
  
      @include g.sm {
        padding: 8px 12px;
        font-size: 12px;
        opacity: 0;
      }
  
      @include g.xs {
        padding: 6px 10px;
        font-size: 11px;
        opacity: 1; // SP版では常に表示
      }
  
      &:hover {
        background: #ff5252;
        transform: scale(1.05);
      }
    }
  
    &__stats {
      background: #f8f9fa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #6c757d;
      flex-shrink: 0; // 統計エリアのサイズを固定
  
      @include g.sm {
        padding: 20px 30px;
        font-size: 14px;
      }
  
      @include g.xs {
        padding: 15px 20px;
        font-size: 12px;
        flex-direction: column;
        gap: 10px;
        align-items: stretch;
      }
    }
  
    &__clear-completed {
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
  
      @include g.sm {
        padding: 8px 16px;
        font-size: 12px;
      }
  
      @include g.xs {
        padding: 10px 16px;
        font-size: 11px;
        width: 100%;
      }
  
      &:hover {
        background: #495057;
      }
  
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  
  .empty-state {
    text-align: center;
    color: #6c757d;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
    @include g.sm {
      padding: 60px 30px;
    }
  
    @include g.xs {
      padding: 40px 20px;
    }
  
    h3 {
      margin-bottom: 10px;
      font-weight: 400;
  
      @include g.sm {
        font-size: 18px;
      }
  
      @include g.xs {
        font-size: 16px;
      }
    }
  
    p {
      @include g.sm {
        font-size: 14px;
      }
  
      @include g.xs {
        font-size: 12px;
      }
    }
  }
  
  // カスタムスクロールバー
  .todo-list::-webkit-scrollbar {
    width: 8px;
  }
  
  .todo-list::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 4px;
  }
  
  .todo-list::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 4px;
  }
  
  .todo-list::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #3a8bfd 0%, #00d4e7 100%);
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