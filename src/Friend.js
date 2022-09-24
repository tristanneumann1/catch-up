import { v4 } from "uuid"

export default class Friend {
    constructor(options = {}) {
        this.name=options.name ?? 'Insert name';
        this.rating = options.rating ?? 3;
        this.id = v4();
    }
}