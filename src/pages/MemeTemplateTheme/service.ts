import request from 'umi-request';

export async function queryList(params: { count: number }) {
  return request('/api/templateCollections', {
    params,
  });
}


export async function addTheme(data: { name: string, coverUrl: string }) {
  return request('/api/templateCollections', {
    method: 'POST',
    data
  })
}

export async function updateTheme(id: string, data: any) {
  return request(`/api/templateCollections/${id}`, {
    method: 'PUT',
    data
  })
}

export async function deleteTheme(id: string) {
  return request(`/api/templateCollections/${id}`, {
    method: 'DELETE',
  })
}