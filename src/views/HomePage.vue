<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AccountDetails from '../components/account.vue';


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
  accountDetails.value = !accountDetails.value
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
  </div>
  <AccountDetails v-if="accountDetails"></AccountDetails>
</template>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: linear-gradient(30.82deg, #5C55D7 12.75%, #53DDBC 88.24%);
  color: white;
  height: 100px;
  font-size: 20px;
  font-weight: 500;
}

.account-info {
  font-size: 1rem;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: thick double #32a1ce;
  ;
  cursor: pointer;
  text-align: center;
  color: black;
  font-weight: 400;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 1.5rem;
}
</style>
