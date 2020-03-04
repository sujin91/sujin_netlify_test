function TodoInput ($target, {addTodo, removeTodo, checkTodo, allRemoveTodo}){
    this.$todoList = document.querySelector('#todo-list')
    this.$btnAllRemove = document.querySelector('#todo-remove')

    this.init = () => {
        this.bindEvent() 
    }

    this.bindEvent = () => {
        $target.addEventListener('keydown', e => {
            if(e.keyCode === 13) {
                addTodo($target.value)
                $target.value = ''
            }
        })

        //커스텀 이벤트
        $target.addEventListener('RemoveAll', e => {
            allRemoveTodo()
        })
    
        this.$btnAllRemove.addEventListener('click', e => {
            $target.dispatchEvent(new Event('RemoveAll'))
        })

        this.$todoList.addEventListener('click', e => {
            const li = e.target.closest('li')
            const ul = e.target.closest('ul')
            const index = Array.from(ul.children).indexOf(li)
            if(e.target.nodeName === 'BUTTON') {
                removeTodo(index)
            }
            else if(e.target.nodeName === 'LI' || e.target.nodeName === 'DEL') {
                checkTodo(index)
            }
        })
    }

    this.init()
}
export default TodoInput

