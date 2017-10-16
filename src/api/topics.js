import Http from '@utils/http';

const fetchList = (data) => {
  return Http.get('topics', data);
}
const fetchDetails = (id, data) => {
  return Http.get(`topic/${id}`, data);
}

export default {
  fetchList,
  fetchDetails
}