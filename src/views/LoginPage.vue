<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginUsername = ref('');
const loginPassword = ref('');


const login = () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const trimmedUsername = loginUsername.value.trim();
  const trimmedPassword = loginPassword.value.trim();
  const user = users.find(user => user.username === trimmedUsername && user.password === trimmedPassword);

  console.log("user", user);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    router.push({ name: "home" }); 
  } else {
    alert("ユーザー名またはパスワードが違います");
  }
};



</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>ログイン</h2>
      <input type="text" v-model="loginUsername" placeholder="ユーザー名" />
      <input type="password" v-model="loginPassword" placeholder="パスワード" />
      <button @click="login">ログイン</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(30.82deg, #5C55D7 12.75%, #53DDBC 88.24%);
}

.login-box {
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
  font-size: medium;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: medium;
}

button:hover {
  background: #0056b3;
}
</style>
