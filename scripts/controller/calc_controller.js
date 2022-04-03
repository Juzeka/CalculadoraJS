class CalcController {
    constructor() {
        this._locale = 'pt-br'
        this._display_calc_el = document.querySelector('#display')
        this._date_el = document.querySelector('#data')
        this._time_el = document.querySelector('#hora')
        this._display_calc = '0'
        this._current_date
        this.initialize()
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