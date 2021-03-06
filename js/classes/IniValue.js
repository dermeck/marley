const IniElement = require('./IniElement');
const $ = require('jquery');

/**
 * @class
 * @property {string} name
 * @property {string} value
 */
module.exports =  class IniValue extends IniElement {
    static get regex() {
        return /^\s*(.*?)="?(.*?)"?\s*$/;
    }

    constructor(name, value) {
        super();
        this.name = name;
        this.value = value;
    }

    toIni() {
        return `${this.name}="${this.escape(this.value)}"`;
    }

    render() {
        let $element = $(`
        <li class="ini-value"><div class="row">
            <div class="col-sm-1 pointer"><i class="fa fa-arrows" aria-hidden="true"></i></div>
            <div class="col-sm-2"><input type="text" class="form-control name" value="${this.name}"></div>
            <div class="col-sm-9 flex-col">
                <textarea class="form-control value" rows="1">${this.value}</textarea>
                <button type="button" class="btn btn-default remove-value"><i class="glyphicon glyphicon-minus"></i></button>
            </div>
        </div></li>`);

        let $name = $element.find('.name');
        $name.change(() => {
            this.name = $name.val();
        });

        let $value = $element.find('.value');
        $value.change(() => {
            this.value = $value.val();
        });

        return $element;
    }

    getContent() {
        let result = this.name + " " + this.value;
        return result;
    }
};
