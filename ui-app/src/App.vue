<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios";
const el = ref()

const students = ref([]);
onMounted(() => {
   axios.get("http://52.203.160.83/api/students",{
    headers:{
      "Accept":"application/json",
      "Content-Type":"application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }).then(response=>{
     students.value = response.data; // Store the response data in students ref
  }).catch(error=>{
     console.log(error)
   });
})
</script>

<template>
  <div>
    <h1>Students List</h1>
    <ul>
      <li v-for="student in students" :key="student.id">
        Name: {{ student.name }}, Age: {{ student.age }}, Gender: {{ student.gender }}, Grade: {{ student.grade }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
