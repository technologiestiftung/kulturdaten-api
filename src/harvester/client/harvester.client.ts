import axios from 'axios';
import { Service } from 'typedi';

@Service()
export class HarvesterClient<T> {

  async fetchData(url: string): Promise<T> {
    return axios.get(url).then(function (response) {
      return response.data;
    });
  }

}

