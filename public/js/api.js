import LoadingView from './LoadingView.js'

function fetchAPI(username) {
    this.init = () => {
        this.settingName()
        this.LoadingView = new LoadingView(document.querySelector('#loading-view'), this.flag)
    }

    this.settingName = (username = 'sujin') => {
        this.username = username
    }

    this.fetchUserData = async () => {
        try {
            const res = await fetch(`http://todo-api.roto.codes/users`)
            const data = await res.json()
            
            return data
        }
        catch (error) {
            throw new Error(error)
        }
    }

    this.fetchData = async () => {
        this.LoadingView.setState(true)
        try {
            const res = await fetch(`http://todo-api.roto.codes/${this.username}`)
            const data = await res.json()
            this.LoadingView.setState(false)
            return data
        }
        catch (error) {
            throw new Error(error)
        }
    }

    this.fetchAdd = async (value) => {
        await fetch(`http://todo-api.roto.codes/${this.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: value,
            }),
        })
    }

    this.fetchRemove = async (id) => {
        await fetch(`http://todo-api.roto.codes/${this.username}/${id}`, {
            method: 'DELETE',
        })
    }

    this.fetchCheck = async (id) => {
        await fetch(`http://todo-api.roto.codes/${this.username}/${id}/toggle`, {
            method: 'PUT',
        })
    }

    this.init()
}
export default fetchAPI
