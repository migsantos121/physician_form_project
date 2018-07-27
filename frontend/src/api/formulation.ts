
import * as querystring from "querystring";
import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import * as assign from "core-js/library/fn/object/assign";

interface Dictionary<T> { [index: string]: T; }

import {BaseAPI, FetchAPI, BASE_PATH, FetchArgs} from './base';

/**
 * FormulationsApi - fetch parameter creator
 */
export const FormulationsApiFetchParamCreator = {
    /**
     * 
     * @summary /formulations
     */
    fetchAll(options?: any): FetchArgs {
        const baseUrl = `/formulations`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = assign({}, { method: "GET" }, options);

        let contentTypeHeader: Dictionary<string> = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    upload(options?: any): FetchArgs {
        const baseUrl = `/customized_formulation`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = assign({}, { method: "POST" }, options);

        let contentTypeHeader: Dictionary<string> = {};
        if (contentTypeHeader) {
            fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
};

/**
 * FormulationsApi - functional programming interface
 */
export const FormulationsApiFp = {
    /**
     * 
     * @summary /formulations
     */
    fetchAll(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = FormulationsApiFetchParamCreator.fetchAll(options);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    upload(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = FormulationsApiFetchParamCreator.upload(options);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * FormulationsApi - object-oriented interface
 */
export class FormulationsApi extends BaseAPI {
    /**
     * 
     * @summary /formulations
     */
    fetchAll(options?: any) {
        return FormulationsApiFp.fetchAll(options)(this.fetch, this.basePath);
    }
    upload(options?: any) {
        return FormulationsApiFp.upload(options)(this.fetch, this.basePath);
    }
};