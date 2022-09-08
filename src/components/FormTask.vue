<template>
   <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
        <v-card-title>
                <span class="text-h5">Nova Tarefa</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-container>
        <v-row>
          <v-col>
                  <v-text-field
                  label="Usuário"
                  v-model="newtask.usuario"
                  >
                  </v-text-field>
                </v-col>
        <v-col cols="12">
                  <v-text-field
                    label="Title*"
                    required
                    v-model="newtask.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Project*"
                    v-model="newtask.projeto"
                    required
                  ></v-text-field>
                </v-col>
                <v-btn style="color: white;" class="ma-4"
                @click="checcaId"
                x-large
                color="pink lighten-2"
                > Confirmar</v-btn>
              </v-row>
            </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import barramento from '../barramento'
export default {
    data() {
        return{
            dialog: false,
            newtask :{
              title: '',
              usuario: '',
              projeto: ''
            }
        }
    },
    methods: {
        limpaForm(){
          this.newtask =   {
              title: '',
              usuario: '',
              projeto: ''
            }
        },
        async addNewTask(){
        await this.$http.post('/tarefas.json', this.newtask).then(response => {
            console.log(response.data)
        })
        this.dialog = false
        this.limpaForm()
        },
        async editarTask(){
          await this.$http.patch(`tarefas/${this.newtask.id}.json`, this.newtask).then(response => {  
            console.log('editado com sucesso', response)
          })
          this.dialog = false
          this.limpaForm()
        }
    },
    computed: {
      checcaId() {
       return this.newtask.id ?  this.editarTask : this.addNewTask
      }
    }
    ,
    created() {
        barramento.quandoAdicionar(value => {
            this.dialog = value.dialog
        }),
   
        barramento.quandoTaskMuda(value => {
          this.dialog = value.dialog
          this.newtask = value.task
        })
    }
}
</script>
<style>
</style>