import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { addTemplate, getTemplate, updateTempate } from './service';

export interface ModelType {
  namespace: string;
  state: {
    template?: any
  };
  effects: {
    create: Effect;
    fetch: Effect;
    update: Effect;
  };
  reducers: {
    loadTemplate: Reducer;
  };
}
const Model: ModelType = {
  namespace: 'templateAndEdit',

  state: {},

  effects: {
    *create({ payload }, { call }) {
      const response = yield call(addTemplate, payload);
      console.log(response);
      if (response.success) {
        message.success('新建成功');
      } else {
        message.error('新建失败')
      }
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(getTemplate, payload)
      console.log(response);
      if (response.success) {
        yield put({
          type: 'loadTemplate',
          payload: response.data.result,
        })
      }
      return response.data.result
    },

    *update({ payload }, { call }) {
      const response = yield call(updateTempate, ...payload);
      console.log(response);
      if (response.success) {
        message.success('更新成功');
      } else {
        message.error('更新失败')
      }
    },
  },

  reducers: {
    loadTemplate(state: any, action: any) {
      console.log(action.payload);
      const { template } = action.payload
      return {
        template,
        ...state,
      };
    },
  },
};

export default Model;
