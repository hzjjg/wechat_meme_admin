import request from 'umi-request';

export async function queryList(params: { count: number }) {
  return request('/api/templateCollections', {
    params,
  });
}
