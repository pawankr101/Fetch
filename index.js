const {} = require('http');

const FetchRequestOption = (function(){
    /**
     * @typedef {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'} MethodType
    */

    /** 
     * @param {string|URL} url
     * @param {string} [method]
     * @param {string} [httpVersion]
     * @returns {FetchRequestOption}
     */
    function FetchRequestOption(url, method, httpVersion) {
        /** @type {URL} */
        this.url = new URL(url);

        /** @type {MethodType} @default 'GET' */
        this.method = method | 'GET';

        /** @type {'H1'|'H2'}} */
        this.httpVersion = httpVersion | 'H1';

        /** @type {{[x: string]: string}} */
        this.headers = {};
    }

    /** @param {{[x: string]: string}} headers @returns {FetchRequestOption} */
    FetchRequestOption.prototype.setHeaders = function(headers) {
        if(headers) {
            for(let key in headers) {
                this.headers[key] = headers[key];
            }
        }
        return this;
    }
    return FetchRequestOption;
})();

/** @class `FetchResponseBody` */
const FetchResponseBody = (function() {

    /**
     * @constructor
     * @param {IncomingMessage} _res 
     * @returns {FetchResponseBody}
     */
    function FetchResponseBody(_res) {
        this.body = null;
    }

    FetchResponseBody.prototype.json = function() {
        return {}
    }
    return FetchResponseBody
})();

const FetchResponse = (/** @template ExtendsType @param {ExtendsType} FetchResBody */function(FetchResBody) {
    /**
     * 
    */

    /**
     * @constructor
     * @augments FetchResponseBody
     * @param {IncomingMessage} _res
     */
    function FetchResponse(_res) {
        FetchResBody.call(this, _res);

        /** @readonly @type {IncomingMessage} */
        this._res = _res;

        /** @readonly @type {{[x: string]: [string]}} */
        this.headers = _res.headersDistinct;

        /** @readonly @type {number} */
        this.status = _res.statusCode;

        /** @readonly @type {string} */
        this.statusText = _res.statusMessage
    }
    FetchResponse.prototype = Object.create(FetchResBody.prototype);

    /**
     * @param {(error: Error) => void} errorHandler 
     */
    FetchResponse.prototype.addErrorHandler = function(errorHandler) {
        this._res.on('error', errorHandler);
    }
    return FetchResponse;
})(FetchResponseBody);

async function fetch1() {
    
}

/** @type {IncomingMessage} */
let re;
new FetchResponse(re);


function a() {
    fetch({
        
    }).then(res=>{
        res.type
    })
}