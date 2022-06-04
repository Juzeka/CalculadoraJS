class CalcController {
    constructor() {
        this._locale = 'pt-br'
        this._display_calc_el = document.querySelector('#display')
        this._date_el = document.querySelector('#data')
        this._time_el = document.querySelector('#hora')
        this._display_calc = '0'
        this._current_date
        this._operation = []
        this.initialize()
        this.initButtonsEvents()
    }

    initialize() {
        this.set_display_date_time()
        // utilizado para ficar execultando de tanto em tanto tempo
        setInterval( () => {
            this.set_display_date_time()
        }, 1000)

        // utilizado para alguma execução em tanto tempo
        // setTimeout ( ()=> {
        //     clearInterval(interval);
        // }, 10000);
    }

    addEventListenerall(element, events, functn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, functn, false)
        })
    }

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        this._operation.pop()
    }

    getLastOperation(){
        return this._operation[this._operation.length -1]
    }

    setLastOperation(value) {
        this._operation[this._operation.length -1] = value
    }

    isOperator(value){
        return (['+','-','*','%', '/'].indexOf(value) > -1)
    }

    calcular(){
        let last = this._operation.pop()
        let result = eval(this._operation.join(''))
        this._operation = [result, last]
    }

    pushOperation(value) {
        this._operation.push(value)

        if (this._operation.length > 3) {
            this.calcular()
        }
    }

    setLastNumberDisplay(){
        let tamanho = this._operation.length - 1
        let last_number

        for (let i = tamanho; i>=0; i--) {
            if(!this.isOperator(this._operation[i])) {
                last_number = this._operation[i];
                break;
            }
        }
        this.display_calc = last_number;
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
               this.setLastOperation(value)
            } else if (isNaN(value)) {
                console.log(value)
            } else {
                this.pushOperation(value)
                this.setLastNumberDisplay()
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value)
            } else {
                let new_value = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(new_value))

                this.setLastNumberDisplay()
            }
        }

        console.log(this._operation)
    }

    setError(){
        this.display_calc = 'Error'
    }

    actionButton(value){
        switch(value) {
            case 'ac':
                this.clearAll()
                break;
            case 'ce':
                this.clearEntry()
                break;
            case 'soma':
                this.addOperation('+')
                break;
            case 'subtracao':
                this.addOperation('-')
                break;
            case 'divisao':
                this.addOperation('/')
                break;
            case 'multiplicacao':
                this.addOperation('*')
                break;
            case 'porcento':
                this.addOperation('%')
                break;
            case 'igual':
                break;
            case 'ponto':
                this.addOperation('.')
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break;
            default:
                this.setError()
                break;
        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g')
        buttons.forEach((btn, index) => {
            this.addEventListenerall(btn, 'click drag', event => {
                let value = btn.className.baseVal.replace('btn-', '')
                // console.log(index)
                this.actionButton(value)
            })

            this.addEventListenerall(btn, 'mouseover mouseup mousedown', event => {
                btn.style.cursor = 'pointer'
            })
        })
    }

    set_display_date_time() {
        this.display_date = this.current_date.toLocaleDateString(
            this.to_locale,
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }
        )
        this.display_time = this.current_date.toLocaleTimeString(this.to_locale)
    }

    get display_calc() {
        return this._display_calc_el.innerHTML
    }

    get current_date() {
        return new Date()
    }

    get display_date() {
        return this._date_el.innerHTML
    }

    get display_time() {
        return this._time_el.innerHTML
    }

    get to_locale() {
        return this._locale.innerHTML
    }

    set display_calc(value) {
        this._display_calc_el.innerHTML = value
    }

    set current_date(value) {
        this._current_date = value
    }

    set display_date(value) {
        this._date_el.innerHTML = value
    }

    set display_time(value) {
        this._time_el.innerHTML = value
    }

    set to_locale(value) {
        this._locale.innerHTML = value
    }
}