const { request, response } = require('express');
const  {Category}  = require ('../models/index');

const categoryController = {

    getAllCategory : async (request, response) => {
        const category = await Category.findAllCategory();

        response.json(category);
    },
    getOneCategory : async (request, response) =>  {

        try {
            const { id } = request.params;

            const categoryId = await Category.findOneCategory(id);

            response.json(categoryId);

        } catch (error) {
            response.status(404).json(error.message);
        }
    },

    postCategory : async (request, response) => {
        const data = request.body;

        try {
            const category = new Category(data);
            const result = await category.newCategory();
            response.json(result);
        } catch (error) {
            response.status(400).json(error.message);
        }
    },
};

module.exports = categoryController;