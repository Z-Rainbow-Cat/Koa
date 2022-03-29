<template>
  <div class="login">
    <input type="text" v-model="state.account" />
    <input type="text" v-model="state.password" />
    <input type="text" v-model="state.user_name" />
    <el-button @click="login">login</el-button>
    <el-button type="primary" @click="regist">regist</el-button>
  </div>
</template>
<script setup>
const { reactive } = require("@vue/reactivity");
import axios from "axios";
let state = reactive({
  account: "",
  password: "",
  user_name: "",
});
const login = () => {
  console.log(state.account);
  console.log(state.password);
  axios
    .post("http://10.89.133.122:3000/user/login", {
      account: state.account,
      password: state.password,
    })
    .then((res) => {
      console.log(res);
    });
};
const regist = () => {
  axios.post("http://10.89.133.122:3000/user/regist", state).then((res) => {
    console.log(res);
  });
};
</script>
