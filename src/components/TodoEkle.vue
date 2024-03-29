<template>
    <div class="submit-form">
        <div class="form-group">
            <label for="userId" >UserId : </label>
            <input type="text" 
            class="form-control"
             id="userId" required 
             v-model="kaydedilecekTodo.userId"
             name="userId" />
        </div>
        <div class="form-group">
            <label for="title" >Title : </label>
            <input type="text" 
            class="form-control"
             id="title" 
            v-model="kaydedilecekTodo.title"
            required name="title" />
        </div>
        <br />
        <button class="btn btn-success" @click="todoKaydet" >Kaydet </button>
         <button class="btn btn-danger" @click="todoVazgec" >Vazgeç </button>
    </div>
</template>
<script>
import TodoDataService from "../services/TodoDataService"
export default {
  name: 'TodoEkle',
   data() {
        return{
            kaydedilecekTodo : {
                userId : "",
                title : ""
            }
        }
    },

      methods : {
       todoKaydet() {

          //{"userId":"1","title":"vue-bootcamp-description"}
        var yeniTodo = {
           userId : this.kaydedilecekTodo.userId,
           title : this.kaydedilecekTodo.title
        }

          TodoDataService.createTodo(yeniTodo).then(kaydedilmisTodo => {
            console.log(kaydedilmisTodo.data);
              this.$router.push({ name: "todos" });
          }).catch(hata => {
            console.log("hata oluştu : " +hata);
          })
       },
       todoVazgec() {
        this.$router.push({ name: "todos" });
       }

      }
 
}
</script>
