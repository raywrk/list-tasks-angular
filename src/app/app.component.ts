import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; //
import { Todo } from 'src/models/todo.model';


imports: [
  FormsModule,
  ReactiveFormsModule
]
//selector html e css são os 3 itens para compor um componente
@Component({
  selector: 'app-root', // se transforma numa tag html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//form group define um grupo de formularios

export class AppComponent {
  public mode: String = 'list'
  public todos: Todo[] = []; // vazio  anny é generico   //public todos: any[]; //undefined
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  /**
   * o this serve para acessar qualquer classe no angular
   * para adicionar itens a um array usa o metodo push
   */
  constructor(private fb: FormBuilder) {
   this.form = this.fb.group({
     title: ['', Validators.compose([
       Validators.minLength(3),
       Validators.maxLength(60),
       Validators.required  //validações para o componente de entrada input
     ])]
   });
   this.todos.push(new Todo(1, 'Passear com o dog', false));
  

   this.load()
  }

  add(){
    //this.form.value => {title: 'Titulo'}
    const id = this.todos.length + 1
    const title = this.form.controls['title'].value   //recebe valor do formulário
    this.todos.push(new Todo(id, title, false))
    this.save()
    this.clear()
  }

  clear(){
    this.form.reset()
    
  }
  alteraTexto(){
    this.title = 'Teste'
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo)  //captura o indixe
    if(index !== -1){
      this.todos.splice(index, 1) //splice deleta e 1 é a quantidade
    }
    this.save()
  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save()
  }

  markUnDone(todo: Todo){
    todo.done = false;
    this.save()
  }

  save(){ //converter para um json string
    const data = JSON.stringify(this.todos) // converte objeto json apra string
    localStorage.setItem('todos', data)
    this.mode = 'list'
  }

  load(){ //ler do localstorage / setado no save e getado no load
    const data = localStorage.getItem('todos'); //aqui le do local storage
    this.todos = data !== null ? JSON.parse(data) : []; // aqui passa converte o string para json e aplica no todos
  }

  changeMode(mode:String){
    this.mode = mode;
  }
}
