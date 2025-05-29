import Cast from "../models/Cast.js";

export default {
    getAll(filter) {
        return Cast.find();
    },
    create(castData) {
        return Cast.create(castData);
    }
};
