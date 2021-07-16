const db = require ('../database');

class Category {
    id;
    label;
    color;

    constructor(data){

        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAllCategory(){
        const {rows} = await db.query('SELECT * FROM "category";');
        
        return rows.map(category => new Category(category));
    }

    static async findOneCategory(id) {
        const query = {

            // text: 
            // `
            // SELECT category.*, photo_has_category.photo_id, album_has_category.album_id FROM category
	        // INNER JOIN photo_has_category ON category.id = photo_has_category.category_id
	        // INNER JOIN album_has_category ON category.id = album_has_category.category_id
	        // WHERE id = $1
            // `,
            text: 
            `
            SELECT  category.*, array_agg (DISTINCT (photo_has_category.photo_id)) as photo_id, array_agg (DISTINCT (album_has_category.album_id)) as album_id 
            FROM category
	        JOIN photo_has_category ON category.id = photo_has_category.category_id
	        JOIN album_has_category ON category.id = album_has_category.category_id
	        WHERE id = $1
	        GROUP BY category.id
            `,
            values: [id]
        }
        const { rows } = await db.query(query);

        if(rows[0]) {
            const category = {
            }
            return new Category(rows[0]); 
        } else {
            throw new Error('No such endpoint');
        }
    }

}

module.exports = Category;