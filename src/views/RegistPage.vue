<template>
  <div class="register-container">
    <div class="register-box">
      <h2>新規登録</h2>
      <input type="text" v-model="name" placeholder="名前" />
      <input type="text" v-model="katakana" placeholder="カタカナ" />
      <input type="email" v-model="email" placeholder="メール" />
      <input type="text" v-model="registerUsername" placeholder="ユーザー名" />
      <input type="password" v-model="registerPassword" placeholder="パスワード" />
      <button @click="register">登録</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const katakana = ref('');
const email = ref('');
const registerUsername = ref('');
const registerPassword = ref('');

const register = () => {
  if (name.value && katakana.value && email.value && registerUsername.value && registerPassword.value) {
    const newUser = {
      name: name.value,
      katakana: katakana.value,
      email: email.value,
      username: registerUsername.value,
      password: registerPassword.value
    };

    // ローカルストレージに保存
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('登録完了！');
    router.push('/login'); // 登録完了後ログインページへ遷移
  } else {
    alert('全ての項目を入力してください');
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(103, 175, 208, 0.5);
}

.register-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 300px;
  height: auto;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
