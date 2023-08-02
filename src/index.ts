import {IncomingMessage, request as httpRequest} from 'http';
import {request as httpsRequest} from 'https';

const Utility = {
    request(url: URL, options: FetchRequestOption) {
        return new Promise((resolve: (response: IncomingMessage) => void, reject: (reason: Error) => void) => {
            const req = (url.protocol === 'https:') ? httpsRequest(url, options) : ((url.protocol === 'http:') ? httpRequest(url, options) : null);
            if(!req) throw new Error(`Only 'http:' or 'https:' protocol allowed`);
            req.on('response', resolve);
            req.on('error', reject);
        })
    },
    buildResponse(_res: IncomingMessage) {

    }
}

interface FetchRequestOption {
    method?: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH';
    headers?: {[x:string]: number|string|[string]};
    body?: ReadableStream<any> | Blob | ArrayBuffer | string;
}

class FetchResponse {
    readonly url?: URL; readonly status?: number; readonly statusText?: string; readonly headers?: {[x:string]: string|[string]};
    constructor(_res: IncomingMessage) {
        this['_res'] = _res;
        this.url = new URL(_res.url || '');
        this.headers = _res.headers;
        this.status = _res.statusCode;
        this.statusText = _res.statusMessage
    }
}

async function fetch1(url: string | URL, options: FetchRequestOption={}) {
    try {
        const res = Utility.request(new URL(url), options)
    } catch(error) {
        throw error
    }
    

}