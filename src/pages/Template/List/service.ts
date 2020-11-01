import request from 'umi-request';

export async function queryFakeList(params: { page: number}) {
  return request('/api/templates', {
    params,
  });
}
