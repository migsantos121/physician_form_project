
import * as querystring from "querystring";
import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import * as assign from "core-js/library/fn/object/assign";

interface Dictionary<T> { [index: string]: T; }

import {BaseAPI, FetchAPI, BASE_PATH, FetchArgs} from './base';

/**
 * IngredientsApi - fetch parameter creator
 */
export const IngredientsApiFetchParamCreator = {
    /**
     * 
     * @summary /Ingredients
     */
    fetchAll(options?: any): FetchArgs {
        const baseUrl = `/ingredients`;
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

    filter(options?: any): FetchArgs {
        const baseUrl = `/formulation_ingredients/show_ingredients`;
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
 * IngredientsApi - functional programming interface
 */
export const IngredientsApiFp = {
    /**
     * 
     * @summary /Ingredients
     */
    fetchAll(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = IngredientsApiFetchParamCreator.fetchAll(options);
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

    filter(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = IngredientsApiFetchParamCreator.filter(options);
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
 * IngredientsApi - object-oriented interface
 */
export class IngredientsApi extends BaseAPI {

    fetchAll(options?: any) {
        return IngredientsApiFp.fetchAll(options)(this.fetch, this.basePath);
    }

    filter(options?: any) {
        return IngredientsApiFp.filter(options)(this.fetch, this.basePath);
    }
};