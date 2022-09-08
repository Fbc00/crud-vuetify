import Vue from 'vue'

export default new Vue({
   methods: { 
       alterarTask(task) { 
           this.$emit('taskMudou', task)
       },
       quandoTaskMuda(task) { 
           this.$on('taskMudou', task)
       },
       adicionaTask(task) {  
        this.$emit('adicionaTask', task)
    },
    quandoAdicionar(task) { 
        this.$on('adicionaTask', task)
    }
   }
})