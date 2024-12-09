export const createAction = (type) => {
  const actionCreator = (payload) => ({ type, payload })
  actionCreator.toString = () => type
  return actionCreator
}
