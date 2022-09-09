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
import queries from '@/queries'
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
         addNewTask(){
          queries.createTask(this.newtask, callback=> {
            this.$emit('alerta', {tipo:'success', message: 'Tarefa Adicionada com Sucesso'})
            console.log(callback)
          })
        this.dialog = false
        this.limpaForm()
        },
         editarTask(){
             queries.updateTask(this.newtask, callback=> {
              console.log(callback)
              this.$emit('alerta', {tipo:'success', message: 'Editado com Sucesso'})
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