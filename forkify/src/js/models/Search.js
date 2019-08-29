import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(query) {
        // key = '2415a34679cb595db33f2aa21af18af8';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            console.log(res);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}
