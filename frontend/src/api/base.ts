import * as isomorphicFetch from 'isomorphic-fetch';
export interface FetchAPI { (url: string, init?: any): Promise<any>; }

var base_path = 'http://127.0.0.1:3000/api';
if (process.env.NODE_ENV === 'production'){
    base_path = 'https://physician-form-backend.herokuapp.com/api';
}
export const BASE_PATH = base_path; 

export interface FetchArgs {
    url: string;
    options: any;
}

export class BaseAPI {
    basePath: string;
    fetch: FetchAPI;

    constructor(fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) {
        this.basePath = basePath;
        this.fetch = fetch;
    }
};