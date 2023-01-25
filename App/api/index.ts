import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { URL_AUTH } from 'const/url';
class API
{
	instance: AxiosInstance;
	constructor() 
	{
		this.instance = axios.create
		(
			{
				baseURL: URL_AUTH,
				timeout: 10000,
				headers: 
				{
					'Content-Type': 'application/json',

				},
			}
		);
	}

	ReturnPromiseResult<T>(response: AxiosResponse<T>): Promise<T> 
	{
		
		return new Promise
		(
			(resolve: (value: T | PromiseLike<T>) => void) => 
			{
				const data: T = response.data as T;
				resolve(data);
			}
		);
	}

	Get<T, Config = any>(url: string, config?: AxiosRequestConfig<Config>): Promise<T>
	{
		return this.instance.get<T>(url, config).then(this.ReturnPromiseResult);
	}
	Post<T, Data, Config = any>(url: string, data: Data, config?: AxiosRequestConfig<Config>): Promise<T>
	{
		return this.instance.post<T>(url, data, config).then(this.ReturnPromiseResult);
	}
	Put<T, Data, Config = any>(url: string, data: Data, config?: AxiosRequestConfig<Config>): Promise<T>
	{
		return this.instance.put<T>(url, data, config).then(this.ReturnPromiseResult);
	}
	Delete<T, Data, Config = any>(url: string, data: Data, config?: AxiosRequestConfig<Config>): Promise<T>
	{
		return this.instance.delete<T>(url, {
			data,
			...config,
		}).then(this.ReturnPromiseResult);
	}
}
const api = new API();
export default api;
