import { useState } from 'react';
import ApiService from '../services/api-service.tsx';

export interface UseCrudReturn {
  data: unknown[];
  read: () => Promise<void>;
  create: (payload: FormData) => Promise<void>;
  updateOne: (id: string | Number, payload: FormData) => Promise<void>;
  deleteOne: (id: string | Number) => Promise<void>;
  patchAddOne: (id: string | Number, payload: FormData) => Promise<void>;
  patchRemoveOne: (
    id: string | Number,
    field: string,
    fieldItem: unknown,
  ) => Promise<void>;
}

export function useCrud(baseUrl: string, initialQueryParams?: Record<string, string>) {
  const [data, setData] = useState<unknown[]>([]);
  const [queryParams] = useState(initialQueryParams ?? {});
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = `${baseUrl}?${queryString}`;

  const read = async () => {
    var response = await ApiService({url: fullUrl});

    if (!response) {
	  return;
    }

    var json = await response.json();
    console.log(json);
    setData(json.data);
  }

  const create = async (data: FormData) => {
	await ApiService({url: `${baseUrl}`, formMethod: "POST", reqBody: data});
	await read();
  }

  const updateOne = async (id: string | Number, data: FormData) => {
    console.log(`Updating project: ${id}`);
	await ApiService({url: `${baseUrl}/${id}`, formMethod: "PUT", reqBody: data});
	await read();
  }

  const deleteOne = async (id: string | Number) => {
    console.log(`Deleting project: ${id}`);
	await ApiService({url: `${baseUrl}/${id}`, formMethod: "DELETE"});
	await read();
  }

  const patchAddOne = async (id: string | Number, data: FormData) => {
	await ApiService({url: `${baseUrl}/${id}/add`, formMethod: "PATCH", reqBody: data});

	await read();
  }

  const patchRemoveOne = async (id: string | Number, field: string, fieldItem: unknown) => {
  	console.log(`Removing ${field} at ${baseUrl}/${id}/remove`);
	var reqBody = {[field]: fieldItem};
	await ApiService({url: `${baseUrl}/${id}/remove`, formMethod: "PATCH", contentType: "application/json", reqBody: JSON.stringify(reqBody)});

	await read();
  }

  return { data, read, create, updateOne, deleteOne, patchAddOne, patchRemoveOne }
}

