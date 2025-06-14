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

// アカウント詳細を閉じる
const closeAccountDetails = () => {
  accountDetails.value = false;
};
</script>

<template>
  <div class="home-container">
    <nav class="nav-bar">
      <h2>Welcome to TO DO LIST</h2>
      <div class="account-info" @click="toggleAccountDetails">
        <span class="account-icon">👤</span>
        <span class="account-text">My Account</span>
      </div>
    </nav>
    
    <!-- メインコンテンツエリア -->
    <main class="main-content">
      <!-- Todoコンポーネント -->
      <div class="todo-wrapper">
        <Todo />
      </div>
    </main>
    
    <!-- アカウント詳細（モーダル） -->
    <AccountDetails 
      v-if="accountDetails" 
      @close="closeAccountDetails"
    />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(249, 248, 248, 0.8);
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
  border: 2px solid #32a1ce;
  cursor: pointer;
  text-align: center;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 12px;
  gap: 8px;
  
  @include g.sm {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  @include g.xs {
    padding: 8px 12px;
    font-size: 12px;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
    border-color: #4facfe;
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.account-icon {
  font-size: 16px;
  
  @include g.xs {
    font-size: 14px;
  }
}

.account-text {
  @include g.xs {
    display: none; // SP版ではテキストを隠してアイコンのみ表示
  }
}

.main-content {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  
  // PC用のスタイル - 高さを制限してスクロール可能に
  @include g.sm {
    height: calc(100vh - 100px); // ナビゲーションの高さを引く
    overflow: hidden; // 親要素でオーバーフローを制御
  }
  
  @include g.xs {
    height: calc(100vh - 70px); // SPナビゲーションの高さを引く
    overflow: hidden;
  }
}

.todo-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; // PCでは中央配置
  overflow: hidden; // 重要：子要素のスクロールを有効にするため
  
  @include g.sm {
    padding: 20px;
  }
  
  @include g.xs {
    padding: 10px;
    align-items: flex-start; // SPでは上寄せ
  }
}

// カスタムスクロールバー（Webkit系ブラウザ用）
:deep(.todo-list)::-webkit-scrollbar {
  width: 8px;
}

:deep(.todo-list)::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

:deep(.todo-list)::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #5C55D7, #53DDBC);
  border-radius: 4px;
}

:deep(.todo-list)::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4a43c4, #45c7a3);
}
</style>