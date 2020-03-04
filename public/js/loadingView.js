function LoadingView ($target, flag) {
    this.flag = flag

    this.init = () => {
        this.render()
    }

    this.render = () => {
        $target.innerHTML = `${this.flag ? '<img src="./img/loading.gif" width="50" alt="loading">' : ''}`
    }

    this.setState = (nextData) => {
        this.flag = nextData
        this.render()
    }

    this.init()
}
export default LoadingView
