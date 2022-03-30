<template>
  <form ref="form">
    <input type="file" @change="change" ref="file" />
  </form>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
const form = ref(null);
const file = ref(null);
const change = (e) => {
  console.log(file.value.files[0]);
  console.log(e);
  let formData = new FormData();
  formData.append("file", file.value.files[0]);
  formData.append("user_id", 1);
  axios.post("http://10.89.133.122:3000/user/avatar", formData).then((res) => {
    console.log(res);
  });
  form.value.reset();
};
</script>
