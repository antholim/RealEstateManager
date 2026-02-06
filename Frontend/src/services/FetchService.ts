export interface FetchOptions extends RequestInit {
  headers?: Record<string, string> | any;
  queryParams?: Record<string, string | number>;
  body?: any; // Allow any type, let the function handle conversion
}

const BASE_URL = 'http://localhost:8080';

function buildQueryParams(params?: Record<string, string | number>) {
  if (!params) return '';
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return `?${query}`;
}

export async function fetchGet<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { queryParams, headers, ...rest } = options;

  const url = `${BASE_URL}${endpoint}${buildQueryParams(queryParams)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      withCredentials: true,
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    credentials: 'include',
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchPost<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { queryParams, headers, body, ...rest } = options;

  const url = `${BASE_URL}${endpoint}${buildQueryParams(queryParams)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    credentials: 'include',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}


export async function fetchPut<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { queryParams, headers, body, ...rest } = options;

  const url = `${BASE_URL}${endpoint}${buildQueryParams(queryParams)}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    credentials: 'include',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchDelete<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { queryParams, headers, ...rest } = options;

  const url = `${BASE_URL}${endpoint}${buildQueryParams(queryParams)}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    credentials: 'include',
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}