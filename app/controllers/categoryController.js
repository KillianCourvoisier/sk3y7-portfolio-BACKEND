const { request, response } = require('express');
const  Category  = require ('../models/category');

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
};

module.exports = categoryController;