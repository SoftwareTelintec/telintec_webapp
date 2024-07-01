import { useState, useEffect } from 'react';
import axios, { Method, AxiosResponse } from 'axios';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_HOST}`;

interface UseFetchResult<T> {
	data: T | null;
	error: Error | null;
	loading: boolean;
}

interface UseFetchOptions {
	method: Method;
	url: string;
	body?: any;
	baseURL?: string;
}

const useFetch = <T,>(options: UseFetchOptions): UseFetchResult<T> => {
	const { method, url, body = null, baseURL } = options;
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response: AxiosResponse<T> = await axios.request({
					method,
					url,
					data: body,
					baseURL: baseURL || axios.defaults.baseURL,
				});
				setData(response.data);
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [method, url, body, baseURL]);

	return { data, error, loading };
};

export default useFetch;
