<template>
  <v-app>

    <v-main class="container">
    
      <v-container max-width="1440px" >
        <v-text-field label="buscar tarefa"
        v-model="task" >

        </v-text-field>
        <TaskComponenteVue  v-for="task in tasks" :key="task.id" :tarefa="task" />


          <FormTaskVue />
          <v-btn
          class="mx-3"
          fab
          dark
          color="indigo"
          @click="adiciona"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn> 
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import TaskComponenteVue from './components/TaskComponente.vue';
import FormTaskVue from './components/FormTask.vue';
import barramento from '@/barramento.js'

export default {
  name: 'App',
  components: {
    FormTaskVue,
    TaskComponenteVue,
},

  data: () => ({
      tasks: [],
      taskFilter: [],
      task: ''
  }), 
  methods: {
    adiciona() {
      barramento.adicionaTask({dialog:true})
    }
},
  created(){
      this.tasks.filter(value => {
        return this.taskFilter.push(value.title.includes(this.task))
      })

  },
  async beforeCreate() {
     await this.$http('tarefas.json').then(response => {
      for (let key in response.data) {
                this.tasks.push({id: key, ...response.data[key]})
            }
    }).catch(error => {
      console.log('houve um erro em buscar todas as tasks', error)
    })

  },

}
</script>
<style scoped>

</style>
