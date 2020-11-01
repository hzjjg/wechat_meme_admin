import request from 'umi-request';

export async function queryList(params: { page: number }) {
  return request('/api/templates', {
    params,
  });
}

export async function deleteTemplate(id: string) {
  return request(`/api/templates/${id}`, {
    method: 'DELETE',
  })
}