/* tslint:disable */
/* eslint-disable */
/**
 * TaskManagementApi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface TaskAddViewModel
 */
export interface TaskAddViewModel {
    /**
     * 
     * @type {string}
     * @memberof TaskAddViewModel
     */
    'title': string;
}
/**
 * 
 * @export
 * @interface TaskListItemViewModel
 */
export interface TaskListItemViewModel {
    /**
     * 
     * @type {number}
     * @memberof TaskListItemViewModel
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof TaskListItemViewModel
     */
    'title'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof TaskListItemViewModel
     */
    'completed'?: boolean;
}
/**
 * 
 * @export
 * @interface TaskUpdateViewModel
 */
export interface TaskUpdateViewModel {
    /**
     * 
     * @type {number}
     * @memberof TaskUpdateViewModel
     */
    'taskId'?: number;
    /**
     * 
     * @type {string}
     * @memberof TaskUpdateViewModel
     */
    'title': string;
}

/**
 * TaskApi - axios parameter creator
 * @export
 */
export const TaskApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {TaskAddViewModel} [taskAddViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTask: async (taskAddViewModel?: TaskAddViewModel, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/Task/AddTask`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(taskAddViewModel, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} taskId 
         * @param {boolean} [completed] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeCompleted: async (taskId: number, completed?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'taskId' is not null or undefined
            assertParamExists('changeCompleted', 'taskId', taskId)
            const localVarPath = `/Task/ChangeCompleted/{taskId}`
                .replace(`{${"taskId"}}`, encodeURIComponent(String(taskId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (completed !== undefined) {
                localVarQueryParameter['completed'] = completed;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} taskId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTask: async (taskId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'taskId' is not null or undefined
            assertParamExists('deleteTask', 'taskId', taskId)
            const localVarPath = `/Task/DeleteTask/{taskId}`
                .replace(`{${"taskId"}}`, encodeURIComponent(String(taskId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTasks: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/Task/GetTasks`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {TaskUpdateViewModel} [taskUpdateViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTask: async (taskUpdateViewModel?: TaskUpdateViewModel, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/Task/UpdateTask`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(taskUpdateViewModel, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TaskApi - functional programming interface
 * @export
 */
export const TaskApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TaskApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {TaskAddViewModel} [taskAddViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addTask(taskAddViewModel?: TaskAddViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addTask(taskAddViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} taskId 
         * @param {boolean} [completed] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeCompleted(taskId: number, completed?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeCompleted(taskId, completed, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} taskId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteTask(taskId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteTask(taskId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTasks(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TaskListItemViewModel>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTasks(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {TaskUpdateViewModel} [taskUpdateViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateTask(taskUpdateViewModel?: TaskUpdateViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateTask(taskUpdateViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TaskApi - factory interface
 * @export
 */
export const TaskApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TaskApiFp(configuration)
    return {
        /**
         * 
         * @param {TaskAddViewModel} [taskAddViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTask(taskAddViewModel?: TaskAddViewModel, options?: any): AxiosPromise<void> {
            return localVarFp.addTask(taskAddViewModel, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} taskId 
         * @param {boolean} [completed] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeCompleted(taskId: number, completed?: boolean, options?: any): AxiosPromise<void> {
            return localVarFp.changeCompleted(taskId, completed, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} taskId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTask(taskId: number, options?: any): AxiosPromise<void> {
            return localVarFp.deleteTask(taskId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTasks(options?: any): AxiosPromise<Array<TaskListItemViewModel>> {
            return localVarFp.getTasks(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {TaskUpdateViewModel} [taskUpdateViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTask(taskUpdateViewModel?: TaskUpdateViewModel, options?: any): AxiosPromise<void> {
            return localVarFp.updateTask(taskUpdateViewModel, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TaskApi - object-oriented interface
 * @export
 * @class TaskApi
 * @extends {BaseAPI}
 */
export class TaskApi extends BaseAPI {
    /**
     * 
     * @param {TaskAddViewModel} [taskAddViewModel] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskApi
     */
    public addTask(taskAddViewModel?: TaskAddViewModel, options?: AxiosRequestConfig) {
        return TaskApiFp(this.configuration).addTask(taskAddViewModel, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} taskId 
     * @param {boolean} [completed] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskApi
     */
    public changeCompleted(taskId: number, completed?: boolean, options?: AxiosRequestConfig) {
        return TaskApiFp(this.configuration).changeCompleted(taskId, completed, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} taskId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskApi
     */
    public deleteTask(taskId: number, options?: AxiosRequestConfig) {
        return TaskApiFp(this.configuration).deleteTask(taskId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskApi
     */
    public getTasks(options?: AxiosRequestConfig) {
        return TaskApiFp(this.configuration).getTasks(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {TaskUpdateViewModel} [taskUpdateViewModel] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskApi
     */
    public updateTask(taskUpdateViewModel?: TaskUpdateViewModel, options?: AxiosRequestConfig) {
        return TaskApiFp(this.configuration).updateTask(taskUpdateViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}


