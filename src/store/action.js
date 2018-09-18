export const Types = {
  TYPE: 'type',
};

export const typeAction = value => ({
  type: Types.TYPE,
  value: value,
});

export const getList = () => {
  return dispatch => {
    axios.get ('/api/data.json').then (res => {
      dispatch (typeAction (res.data.list));
    });
  };
};
