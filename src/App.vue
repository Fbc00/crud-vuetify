<template>
  <v-app>

    <v-main class="container">
    <v-alert :type="alerta.tipo" 
    dismissible v-show="alerta">{{ alerta.message }}</v-alert>
      <v-container max-width="1440px"  v-if="!loading">
        <v-col
        >
          <v-text-field label="BUSCAR TAREFA"
        v-model="task"
        >
      </v-text-field>
        </v-col>      
        <TaskComponenteVue v-for="task in tasks" :key="task.id" :tarefa="task" />
          <FormTaskVue   @alerta="alerta = $event" />
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
      <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      v-else
    ></v-progress-circular>
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
      alerta: '',
      tasks: [],
      taskFilter: [],
      loading: true,
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
    this.loading = false
  },

}
</script>
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 700px;
  }

</style>
