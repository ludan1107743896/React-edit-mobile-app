
export default {
  namespace: 'example',
  state: {
    selectItem: {},
    visourDomArray: [],
    parentPath: '',
    selectEidtComp: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'SaveItem' });
    },
    * select_item ({ payload }, { call, put }) {
      yield put({type: 'SaveItem', payload});
    }
  },

  reducers: {
    SaveItem(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
