import Http from '@utils/http';

const fetchList = (data) => {
  return Http.get('topics', data);
}

export default {
  fetchList
}