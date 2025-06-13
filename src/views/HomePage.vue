<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AccountDetails from '../components/account.vue';
import Todo from '../components/todo.vue';

const router = useRouter();
const loggedInUser = ref(null);
const accountDetails = ref(false);

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  if (storedUser) {
    loggedInUser.value = storedUser;
  } else {
    router.push('/login');
  }
});

const toggleAccountDetails = () => {
  accountDetails.value = !accountDetails.value;
};
</script>

<template>
  <div class="home-container">
    <nav class="nav-bar">
      <h2>Welcome to TO DO LIST</h2>
      <div class="account-info" @click="toggleAccountDetails">
        My Account
      </div>
    </nav>
    
    <!-- メインコンテンツエリア -->
    <main class="main-content">
      <!-- アカウント詳細（モーダル風） -->
      <AccountDetails v-if="accountDetails" class="account-modal" />
      
      <!-- Todoコンポーネント -->
      <div class="todo-wrapper">
        <Todo />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(249, 248, 248, 0.8);
  
  @include g.sm {
    height: 100vh;
    width: 100vw;
  }
  
  @include g.xs {
    min-height: 100vh;
    width: 100%;
  }
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(30.82deg, #5C55D7 12.75%, #53DDBC 88.24%);
  color: white;
  font-weight: 500;
  position: sticky; // ナビゲーションを固定
  top: 0;
  z-index: 100;
  
  @include g.sm {
    padding: 15px 30px;
    height: 100px;
    font-size: 20px;
  }
  
  @include g.xs {
    padding: 10px 15px;
    height: 70px;
    font-size: 16px;
  }
  
  h2 {
    margin: 0;
    
    @include g.xs {
      font-size: 18px;
    }
  }
}

.account-info {
  display: flex;
  justify-content: center;
  align-items: center;
  border: thick double #32a1ce;
  cursor: pointer;
  text-align: center;
  color: black;
  font-weight: 400;
  transition: all 0.3s ease;
  
  @include g.sm {
    width: 120px;
    height: 60px;
    font-size: 14px;
  }
  
  @include g.xs {
    width: 80px;
    height: 40px;
    font-size: 12px;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
}

.main-content {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  
  @include g.sm {
    padding: 20px;
    overflow-y: auto; // メインコンテンツをスクロール可能に
  }
  
  @include g.xs {
    padding: 10px;
    overflow-y: auto;
  }
}

.account-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 200;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @include g.xs {
    top: 10px;
    right: 10px;
    left: 10px;
  }
}

.todo-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  @include g.sm {
    padding-top: 20px;
  }
  
  @include g.xs {
    padding-top: 10px;
  }
}

// カスタムスクロールバー（Webkit系ブラウザ用）
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #5C55D7, #53DDBC);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4a43c4, #45c7a3);
}
</style>