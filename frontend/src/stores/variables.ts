import * as isomorphicFetch from "isomorphic-fetch";

//warning does not change the logic of this, is not working in dev, please make it work
export const BasePath = process.env.NODE_ENV === "development" ? "http://localhost:8787": "" ;

export  function ownFetch(path:string, options:any){
    options.credentials = 'include';
    return isomorphicFetch(path, options)
}