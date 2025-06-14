<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userInfo = ref(null);
const showConfirmDialog = ref(false);

// ユーザー情報を取得
onMounted(() => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    userInfo.value = loggedInUser;
  }
});

// ログアウト確認ダイアログを表示
const confirmLogout = () => {
  showConfirmDialog.value = true;
};

// ログアウト処理
const logout = () => {
  localStorage.removeItem('loggedInUser');
  router.push('/login');
};

// ログアウトをキャンセル
const cancelLogout = () => {
  showConfirmDialog.value = false;
};

// Emit for parent component to close account details
const emit = defineEmits(['close']);

const closeAccount = () => {
  emit('close');
};
</script>

<template>
  <div class="account-overlay" @click="closeAccount">
    <div class="account-details" @click.stop>
      <!-- ヘッダー -->
      <div class="account-header">
        <h3>アカウント情報</h3>
        <button class="close-btn" @click="closeAccount">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- ユーザー情報表示 -->
      <div class="user-info" v-if="userInfo">
        <div class="info-item">
          <label>名前</label>
          <div class="info-value">{{ userInfo.name }}</div>
        </div>
        
        <div class="info-item">
          <label>カタカナ</label>
          <div class="info-value">{{ userInfo.katakana }}</div>
        </div>
        
        <div class="info-item">
          <label>メールアドレス</label>
          <div class="info-value">{{ userInfo.email }}</div>
        </div>
        
        <div class="info-item">
          <label>ユーザー名</label>
          <div class="info-value">{{ userInfo.username }}</div>
        </div>
      </div>

      <!-- ローディング状態 -->
      <div v-else class="loading">
        <p>ユーザー情報を読み込み中...</p>
      </div>

      <!-- ログアウトボタン -->
      <div class="account-actions">
        <button class="logout-btn" @click="confirmLogout">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H6M11 11L14 8M14 8L11 5M14 8H6" 
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ログアウト
        </button>
      </div>
    </div>

    <!-- ログアウト確認ダイアログ -->
    <div v-if="showConfirmDialog" class="confirm-dialog" @click.stop>
      <div class="dialog-content">
        <h4>ログアウト確認</h4>
        <p>本当にログアウトしますか？</p>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="cancelLogout">キャンセル</button>
          <button class="confirm-btn" @click="logout">ログアウト</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  
  @include g.sm {
    padding: 20px;
  }
  
  @include g.xs {
    padding: 10px;
    justify-content: center;
    align-items: center;
  }
}

.account-details {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
  
  @include g.sm {
    width: 350px;
    max-height: calc(100vh - 40px);
    margin-top: 80px; // ナビゲーション分のマージン
  }
  
  @include g.xs {
    width: 90vw;
    max-width: 400px;
    max-height: 80vh;
  }
}

.account-header {
  background: linear-gradient(135deg, #5C55D7 0%, #53DDBC 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.user-info {
  padding: 24px 20px;
  
  @include g.xs {
    padding: 20px 16px;
  }
}

.info-item {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
}

.info-value {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #495057;
  word-break: break-all;
  
  @include g.xs {
    padding: 10px 12px;
    font-size: 13px;
  }
}

.loading {
  padding: 40px 20px;
  text-align: center;
  color: #6c757d;
  
  p {
    margin: 0;
    font-size: 14px;
  }
}

.account-actions {
  padding: 20px;
  border-top: 1px solid #e9ecef;
  
  @include g.xs {
    padding: 16px;
  }
}

.logout-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(255, 107, 107, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 確認ダイアログ
.confirm-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}

.dialog-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  min-width: 280px;
  text-align: center;
  
  h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    color: #333;
  }
  
  p {
    margin: 0 0 20px 0;
    font-size: 14px;
    color: #666;
  }
}

.dialog-actions {
  display: flex;
  gap: 12px;
  
  button {
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
}

.cancel-btn {
  background: #f8f9fa;
  color: #6c757d;
  
  &:hover {
    background: #e9ecef;
  }
}

.confirm-btn {
  background: #ff6b6b;
  color: white;
  
  &:hover {
    background: #ff5252;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// SP用の別アニメーション
@include g.xs {
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>