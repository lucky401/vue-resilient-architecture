/**
 * Mutate your state with this way:
 *    commit('MUTATION_NAME', {accessor: 'a.b.c', value: 'cValue'})
 * Interpolated as:
 *    state.a.b.c = 'cvalue'
 *
 * @param {String} state   Current state of vuex.
 * @param {Object} payload Mutation payload. eg: {accessor: 'a.b.c.d', value: 'dValue'}
 *
 * @return {void}
 */
export default function (state, payload) {
  const { accessor, value } = payload;
  const accessors = accessor.split('.');
  const field = accessors.pop();

  accessors.reduce((object, index) => object[index], state)[field] = value;
}
