import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const key = '2415a34679cb595db33f2aa21af18af8';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            console.log(res);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}
