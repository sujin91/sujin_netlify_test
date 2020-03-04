import TodoList from './TodoList.js'
import TodoInput from './TodoInput.js'
import TodoCount from './TodoCount.js'
import UserList from './UserList.js'
import fetchAPI from './api.js'
import LoadingView from './LoadingView.js'
import { storage } from './util.js'

function App() {
    this.userName = 'sujin'
    this.data = [] 
    this.userData = []
    this.flag = false
    
    this.init = () => {
        this.userList = new UserList(document.querySelector('#user-list'), this.userData, {
            changeUser: this.changeUser
        })
        this.todoList = new TodoList(document.querySelector('#todo-list'), this.data)
        this.todoInput = new TodoInput(document.querySelector('#todo-input'), {
            addTodo: this.addTodo,
            removeTodo: this.removeTodo,
            checkTodo: this.checkTodo,
            allRemoveTodo: this.allRemoveTodo
        })
        this.todoCount = new TodoCount(document.querySelector('#todo-count'), this.data)
        this.fetchAPI = new fetchAPI(this.userName)

        this.getFetchData()
        this.getFetchUserData()
    }

    this.getStorage = () => {
        if (storage.get('todolist') === null) this.data = []
        else {
            this.data = JSON.parse(storage.get('todolist'))   
        }
    }

    this.setStorage = () => {
        storage.set('todolist', JSON.stringify(this.data))
    }

    this.getFetchUserData = async () => {
        this.userData = await this.fetchAPI.fetchUserData()
        this.userList.setState(this.userData)
    }

    this.changeUser = async (text) => {
        this.fetchAPI.settingName(text)
        this.setState(await this.fetchAPI.fetchData())
    }
    
    this.getFetchData = async () => {
        this.data = await this.fetchAPI.fetchData()
        this.setState(this.data)
    }

    this.addTodo = async (value) => {
        const newData = {}
        newData.content = value
        newData.isCompleted = false

        await this.fetchAPI.fetchAdd(value)

        this.setState(await this.fetchAPI.fetchData())
        this.setStorage()
    }

    this.removeTodo = async (index) => {
        let id = this.data[index]._id
        
        await this.fetchAPI.fetchRemove(id)

        this.setState(await this.fetchAPI.fetchData())
        this.setStorage()
    }

    this.checkTodo = async (index) => {
        let id = this.data[index]._id

        await this.fetchAPI.fetchCheck(id)

        this.setState(await this.fetchAPI.fetchData())
        this.setStorage()
    }

    this.allRemoveTodo = () => {
        this.data = []
        this.setState(this.data)
        localStorage.clear()
    }

    this.setState = async (updatedData = []) => {
        this.data = updatedData
        this.todoList.setState(this.data)
        this.todoCount.setState(this.data)
    }

    this.init()
}
export default App
