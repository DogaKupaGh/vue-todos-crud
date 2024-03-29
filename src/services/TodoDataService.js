import http from "../httpcommon";


class TodoDataService {

getAllTodos()
{
    //https://jsonplaceholder.typicode.com/todos
    return http.get("/todos");
}

getTodoDetail(id)
{
    return http.get(`/todos/${id}`);
}

updateTodo(id,data)
{

      //data {"id":11,"title":"testtest","description":"testtestdesc","published":false}
    return http.put(`/todos/${id}`,data);
}

deleteTodo(id)
{
     //https://jsonplaceholder.typicode.com/todos/1
    return http.delete(`/todos/${id}`);
}


createTodo(data) 
{
    //ilgili servise göndermiş olduğumuz json objesi 
    //backend servisinde nesneye dönüştürülüp database yazılıyor
    //database ilgili todo yazıldıktan sonra bize yine json olarak döndürülüyor
    return http.post("/todos",data);
}


findByTitle(title){
    return http.get(`/todos?title=${title}`);
}




}

export default new TodoDataService();