<template>
    <div class="list row"> 
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input  type="text" class="form-control" placeholder="Başlığa göre ara"
          v-model="aranacakKelime" />
          <div class="input-group-append">
          <button class="btn btn-success" type="button" @click="searchByTitle"
          >
            Ara
          </button>
          <button class="btn btn-success ml-2" type="button" @click="refresh"
          >
            Yenile
          </button>
        </div>
        </div>
      </div>
        <div class="col-md-6">
            Todo Listesi
            <ul>
            <li class="list-group-item" 
            v-for="(todo,index) in todos" :key="index"
            :class="{ active: index == guncelIndex }"
             @click="aktifTodo(todo,index)"
            >
            {{todo.title}} - {{todo.userId}}
            </li>
            </ul>
        </div>
        <div class="col-md-6">
          <div v-if="guncelTodos">
            <h4>Todo Detay</h4>
            <div>
              <label><strong>Title:</strong></label> {{ guncelTodos.title }}
            </div>
            <div>
              <label><strong>UserId:</strong></label> {{ guncelTodos.userId }}
            </div>
            <div>
              <label><strong>Id:</strong></label> 
              {{ guncelTodos.id}}
            </div>
            <div>
              <label><strong>Completed:</strong></label> 
              {{ guncelTodos.completed}}
            </div>
    
            <router-link :to="'/todos/' + guncelTodos.id" 
            class="badge badge-warning">Düzenle</router-link>
          </div>
          <div v-else>
            <br />
            <p></p>
          </div>
        </div>
    </div>
</template>



<script>
//public class TodoList diyebiliriz exportdefault

import TodoDataService from "../services/TodoDataService";


export default{
    name: "todos-list",
    //html tarafında kullanmak isteyeceğim değişkenler
    //objeler arrayler data içerisinde tanımlanır

    data(){
        return{
            todos : [],
            guncelTodos: null,
            guncelIndex: -1,
            aranacakKelime: ''
        }
       
    },

    methods : {
        todolariGetir(){
            TodoDataService.getAllTodos().then(gelenTodos => {
                this.todos = gelenTodos.data;
                console.log(gelenTodos.data);
            })
            .catch(hata => {
                console.log(hata);
            })
        },
        aktifTodo(todo,index){
            this.guncelTodos = todo;
            this.guncelIndex = index
        },

        searchByTitle(){
          TodoDataService.findByTitle(this.aranacakKelime)
          .then(aramaSonucu => {
            this.todos = aramaSonucu.data;
          }).catch(hata => {
            console.log("hata" + hata);
          })
        },

        refresh(){
          this.todolariGetir();
        }
    },
    mounted(){
        this.todolariGetir();
    }
}
</script>
