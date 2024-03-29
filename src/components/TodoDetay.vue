<template>
    <div v-if="guncellencekTodo" class="submit-form">
        <div class="form-group">
            <label for="userId" >UserId : </label>
            <input type="text" 
            class="form-control"
             id="userId" required 
             v-model="guncellencekTodo.userId"
             name="userId" />
        </div>
        <div class="form-group">
            <label for="title" >Title : </label>
            <input type="text" 
            class="form-control"
             id="title" 
              v-model="guncellencekTodo.title"
            required name="title" />
        </div>
        <br />
        <button class="btn btn-success" @click="todoGuncelle">Güncelle </button>
         <button class="btn btn-danger"  @click="TodoSil" >Sil </button>
    </div>
</template>
<script>
import TodoDataService from "../services/TodoDataService"
export default {
    name : "todo-detail",
    data(){
        return{
            guncellencekTodo : null,
        }
    },
    methods: {
      todoDetayGetir(id){
        TodoDataService.getTodoDetail(id).then(gelenTodo => {
            //{"id":id,"title":"testtest","description":"testtestdesc","published":false}
            this.guncellencekTodo = gelenTodo.data;
        })
      },

      todoGuncelle()
      {
       
        TodoDataService.updateTodo(this.guncellencekTodo.id,this.guncellencekTodo)
        .then(guncellenmisTodo => {
            console.log(guncellenmisTodo.data);
            this.$router.push({ name: "todos" });
        }).catch(hata => {
            console.log("hata oluştu : " +hata);
        });
      },
       TodoSil()
      {
        {
        if(confirm("Silmek istediğinizden emin misiniz?") == true){
            TodoDataService.deleteTodo(this.guncellencekTodo.id)
            .then(response => {
            console.log(response);
           // this.$router.push({ name: "todos" });
        });
        }else{
            console.log("Silme gerçekleşmedi")
        }

    }
      }

    },
    mounted() {
        //bana bir önceki yani tutoriaListteki tıklamış olduğum tutorial ın id si gelecek
        this.todoDetayGetir(this.$route.params.id);
    }
    
}
</script>