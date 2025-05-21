import fs from 'node:fs/promises'
import { v4 as uuid } from 'uuid'

const moviesJson = await fs.readFile('./src/database.json');
export const movies = JSON.parse(moviesJson);

export default class Movie {
    constructor(data) {
        this.data = data;
    }

    async save() {
        // Set unique id
        this.data.id = uuid();

        // Convert rating from string to number
        this.data.rating = Number(this.data.rating);

        movies.push(this.data);

        await fs.writeFile('./src/database.json', JSON.stringify(movies, null, 4));

        return this.data;
    }
}

