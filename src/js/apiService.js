const baseURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;

export default {
  page: 1,
  query: '',

  apiService() {
    const requestParams = `&q=${this.query}&page=${this.page}&per_page=12&`;
    const key = `key=15649816-5edb2a5a107a8cd075df501c6`;
    return fetch(baseURL + requestParams + key)
      .then(res => res.json())
      .then(data => {
        this.nextPage();
        return data.hits;
        console.log(data);
      })
      .catch(error => console.log(error));
  },

  nextPage() {
    this.page += 1;
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  resetPage() {
    this.page = 1;
  },
};
