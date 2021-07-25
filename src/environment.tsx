const key = '5e241dbc'

const environment = {
  production: false,
  api: {
    endpoint: `http://www.omdbapi.com/?apikey=${key}`,
    postersEndpoint: `http://img.omdbapi.com/?apikey=${key}`
  }
};
export default environment
