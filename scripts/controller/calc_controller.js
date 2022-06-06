class CalcController {
    constructor() {
        this._locale = 'pt-br'
        this._display_calc_el = document.querySelector('#display')
        this._date_el = document.querySelector('#data')
        this._time_el = document.querySelector('#hora')
        this._display_calc = '0'
        this._current_date
        this._operation = []
        this._last_operator
        this._last_number
        this._audio = new Audio('click.mp3')
        this._audioOnOff = false
        this.initialize()
        this.initButtonsEvents()
        this.initKeyBoard()
    }

    copyToClipboard() {
        let input = document.createElement('input')
        input.value = this.display_calc
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        input.remove()
    }

    pasteFromClipBoard() {
        document.addEventListener('paste', event => {
            let text = event.clipboardData.getData('Text')
            this.display_calc = parseFloat(text)
        })
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
        this.setLastNumberDisplay()
        this.pasteFromClipBoard()
        this.doubleClickAC()

    }

    doubleClickAC() {
        document.querySelectorAll('.btn-ac').forEach(button => {
            button.addEventListener('dblclick', event => {
                this.toggleAudio()
            })
        })
    }

    toggleAudio() {
        this._audioOnOff = !this._audioOnOff
    }

    playAudio() {
        if (this._audioOnOff) {
            this._audio.currentTime = 0
            this._audio.play()
        }
    }

    initKeyBoard() {
        document.addEventListener('keyup', event => {
            this.playAudio()

            switch(event.key) {
                case 'Escape':
                    this.clearAll()
                    break;
                case 'Backspace':
                    this.clearEntry()
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(event.key)
                    break;
                case '=':
                case 'Enter':
                    this.calcular()
                    break;
                case '.':
                case ',':
                    this.addDot('.')
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
                    this.addOperation(parseInt(event.key))
                    break;
                case 'c':
                    if (event.ctrlKey) this.copyToClipboard()
                    break;
            }
        })
    }

    addEventListenerall(element, events, functn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, functn, false)
        })
    }

    clearAll(){
        this._operation = []
        this._last_number = ''
        this._last_operator = ''
        this.setLastNumberDisplay()
    }

    clearEntry(){
        this._operation.pop()
        this.setLastNumberDisplay()
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

    getResult(){
        return eval(this._operation.join(''))
    }

    calcular(){
        let last = ''
        let result
        this._last_operator = this.getLastItem()

        if (this._operation.length < 3) {
            let first_item = this._operation[0]
            this._operation = [first_item, this._last_operator, this._last_number]
        }
        if (this._operation.length > 3) {
            last = this._operation.pop()
            this._last_number = this.getResult()
        } else if (this._operation.length == 3) {
            this._last_number = this.getLastItem(false)
        }

        result = this.getResult()

        if (last == '%') {
            result /= 100
            this._operation = [result]

        } else {
            this._operation = [result]

            if (last) this._operation.push(last)
        }

        this.setLastNumberDisplay()
    }

    pushOperation(value) {
        this._operation.push(value)

        if (this._operation.length > 3) {
            this.calcular()
        }
    }

    getLastItem(isOperator = true) {
        let last_item
        let tamanho = this._operation.length - 1

        for (let i = tamanho; i >= 0; i--) {
            if(this.isOperator(this._operation[i]) == isOperator) {
                last_item = this._operation[i];
                break;
            }
        }

        if (!last_item) {
            last_item = (isOperator) ? this._last_operator : this._last_number
        }

        return last_item
    }

    setLastNumberDisplay(){
        let last_number = this.getLastItem(false)

        if (!last_number) last_number = 0

        this.display_calc = last_number;
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
               this.setLastOperation(value)
            } else {
                this.pushOperation(value)
                this.setLastNumberDisplay()
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value)
            } else {
                let new_value = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(new_value)
                this.setLastNumberDisplay()
            }
        }
    }

    addDot() {
        let last_operation = this.getLastOperation()

        if (typeof last_operation === 'string' && last_operation.split('').indexOf('.') > -1) return
        if (this.isOperator(last_operation) || !last_operation) {
            this.pushOperation('0.')
        } else {
            this.setLastOperation(last_operation.toString() + '.')
        }

        this.setLastNumberDisplay()
    }

    setError(){
        this.display_calc = 'Error'
    }

    actionButton(value){
        this.playAudio()

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
                this.calcular()
                break;
            case 'ponto':
                this.addDot('.')
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
        if (value.toString().length > 10) {
            this.setError()
            this._operation = []
            return false
        }
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