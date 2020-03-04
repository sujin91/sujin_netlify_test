function TodoCount ($target, data) {
    this.$target = $target
    this.data = data

    this.render = () => {
        //isComplete값이 true인애들만 모인 배열의 length 출력!
        const count = this.data.filter(item => item.isCompleted).length
        
        this.$target.innerHTML = `
            전체 TODO : ${this.data.length} <br>
            완료된 TODO : ${count}
        `
    }

    this.setState = (nextData) => {
        this.data = nextData
        this.render()
    }

    this.render()
}
export default TodoCount
