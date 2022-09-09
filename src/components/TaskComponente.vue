<template>
    <v-container >
        <v-card
            elevation="4"
            shaped
            width="700"
            >
                <v-card-title>
                    {{ tarefa.title }}
                </v-card-title>
                    <v-card-subtitle>{{tarefa.usuario}}</v-card-subtitle>
                    <v-card-text>{{tarefa.projeto}}</v-card-text>
                    <v-btn large class="ma-4 " color="primary" 
                    @click="editarTask">Editar</v-btn>
                    <v-btn large class="ma-4" color="error"
                    @click="excluirTask(tarefa.id)">Excluir</v-btn>
        </v-card >
    </v-container>
</template>

<script>
import barramento  from '@/barramento'
import queries from '../queries'
export default {
    props: {
        tarefa: {
            type: Object,
        }
    },
    data(){
        return {
        }
    },
    methods: {
        editarTask() {
            barramento.alterarTask({dialog:true, task:this.tarefa})
        },
        excluirTask(id){
            queries.deleteTask(id, callback=> {
                console.log(callback)
            })
        }
    
    },

}
</script>

<style scoped>
</style>