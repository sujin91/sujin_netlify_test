function TodoList($target, data) {
  this.$target = $target
  this.data = data

  this.render = function() {
    this.$target.innerHTML = `<ul>${this.data
      .map(todo => 
        todo.isCompleted 
         ? `<li><del>${todo.content}</del><button type="button">X</button></li>`
         : `<li>${todo.content}<button type="button">X</button></li>`
        )
      .join('')} </ul>`
  }

  this.setState = function(nextData) {
    this.data = nextData
    this.render()
  }

  this.render()
}
export default TodoList
