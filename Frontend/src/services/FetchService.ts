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
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
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
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}


// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const getUser = async (userId: number) => {
//   const user = await fetchGet<User>(`/users/${userId}`);
//   console.log('User:', user);
// };


// interface LoginResponse {
//   token: string;
//   userId: number;
// }

// const loginUser = async (email: string, password: string) => {
//   const response = await fetchPost<LoginResponse>('/auth/login', {
//     body: {
//       email,
//       password,
//     },
//   });

//   console.log('Login success:', response.token);
// };

// const searchUsers = async () => {
//   const users = await fetchGet<User[]>('/users/search', {
//     queryParams: { name: 'John' },
//   });
//   console.log('Matching users:', users);
// };