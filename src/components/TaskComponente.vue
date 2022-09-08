<template>
    <v-container >
            <v-card
            elevation="4"
            shaped
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
        async excluirTask(id){
            await this.$http.delete(`tarefas/${id}.json`).then(response => {
                console.log(response.code)
            })
            console.log('task exluida com sucesso')
        }

    },

}
</script>

<style scoped>
.componente{
    display: flex;
    justify-content: center;
}
</style>