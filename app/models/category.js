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
            
            text: 
            `
            SELECT  category.*, array_agg (DISTINCT (photo_has_category.photo_id)) as photo_id, array_agg (DISTINCT (album_has_category.album_id)) as album_id 
            FROM category
	        LEFT OUTER JOIN photo_has_category ON category.id = photo_has_category.category_id
	        LEFT OUTER JOIN album_has_category ON category.id = album_has_category.category_id
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

    async newCategory() {

        const insertQuery = {
            text: `
                INSERT INTO category (label, color)
                VALUES ($1, $2) RETURNING id;
            `,
            values: [this.label, this.color]
        }



        try {
            const { rows } = await db.query(insertQuery);
            if(rows[0]) {
                return (rows[0], 'Nouvelle catégorie ajoutée !');
            } else {
                throw new Error('Catégorie érronée, veuillez réessayer');
            }
        } catch (error) {
            switch (error.constraint) {
                case 'category_label_key':
                    throw new Error('Cet catégorie existe déjà, selectionne le tag existant ou enregistre-en un autre');
                    break;
                default:
                    throw new Error('Localisation érronée, veuillez réessayer');
                    break;
            }
        }
    }

    async updateCategory(id) {

        const updateQuery = {
            text: `
                UPDATE category SET
                label = $2,
                color= $3
                WHERE id = $1
                RETURNING id
            `,
            values: [id, this.label, this.color]
        }

        try {
            const { rows } = await db.query(updateQuery);
            if(rows[0]) {
                return 'La catégorie a bien été mise à jour';
            }
            
        } catch (error) {
            throw new Error('Mise à jour invalidée, veuillez réessayer');
        }
    
    }

}

module.exports = Category;