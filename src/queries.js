import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://curso-vue-e36bf-default-rtdb.firebaseio.com/',
  });
export default  {
   getTasks: (callback) => {
    instance.get('tarefas.json').then((response) => {
      callback(response.data)
    })
  },
  createTask: (task, callback) => {
    instance.post('tarefas.json', task).then((response) => {
      callback(response.data)
    })
  },
  updateTask: (task, callback) => {
    instance.patch(`tarefas/${task.id}.json`, task).then(response => {  
        callback(response.data)
      })
  },
    deleteTask: (task, callback) => {        
        instance.delete(`tarefas/${task}.json`).then(response => {
        callback(response.data)
    })
  }
}
