import { Effect, Reducer } from 'umi';

import { CardListItemDataType } from './data.d';
import { queryList } from './service';

export interface StateType {
  list: CardListItemDataType[];
  pager: {
    page: number,
    pageSize: number,
    total: number
  }
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'templateAndList',

  state: {
    list: [],
    pager: {
      page: 1,
      pageSize: 50,
      total: 0
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      if (response.success) {
        yield put({
          type: 'queryList',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    queryList(state, action) {
      console.log(action.payload);
      const { list, pager } = action.payload
      const { Limit, Offset, Total } = pager;
      return {
        ...state,
        list,
        pager: {
          total: Total,
          page: Math.floor(Offset / Limit) + 1,
          pageSize: Limit
        } as any
      };
    },
  },
};

export default Model;
