function UserList ($target, userData, {changeUser}) {
    const $userName = document.querySelector('h1').children[0]
    this.data = userData

    this.init = () => {
        this.bindEvent()
        this.render()
    }

    this.render = (userName = 'sujin') => {
        $target.innerHTML = `<ul>${this.data
            .map (member =>
            `<li>${member}</li>`)
            .join('')} </ul>`

        $userName.innerHTML = userName
    }

    this.setState = (nextData) => {
        this.data = nextData
        this.render()
    }

    this.bindEvent = () => {
        $target.addEventListener('click', e => {
            if(e.target.nodeName === 'LI') {
                this.render(e.target.innerHTML)
                changeUser(e.target.innerHTML)
            }
        })
    }

    this.init()
}
export default UserList
