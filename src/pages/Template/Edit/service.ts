import request from 'umi-request';

export async function addTemplate(data: any) {
  return request('/api/templates', {
    method: 'POST',
    data,
  });
}

export async function updateTempate(id: string, data: any) {
  console.log(id, data);
  return request(`/api/templates/${id}`, {
    method: 'PUT',
    data
  })
}

export async function getTemplate(id: string) {
  return request(`/api/templates/${id}`, {
    method: 'GET',
  })
}