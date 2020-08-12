const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers_table ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database error: ${err}`

            callback(results.rows);
        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO teachers_table (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_category,
                educational_area,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_category,
            data.educational_area,
            date(Date.now()).iso
        ];

        db.query(query, values, function (err, results) {
            if (err) throw `Database error: ${err}`

            callback(results.rows[0])
        });
    },

    find(id, callback) {
        db.query(`
                SELECT * 
                FROM teachers_table 
                WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error: ${err}`
            callback(results.rows[0]);
        })
    },

    update(data, callback) {
        const query = `
        UPDATE teachers_table SET
            avatar_url=($1),
            name=($2),
            birth_date=($3),
            education_level=($4),
            class_category=($5),
            educational_area=($6)
        WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_category,
            data.educational_area,
            data.id,
        ];

        db.query(query, values, function (err, results) {
            if (err) throw `Database error: ${err}`

            return callback();
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM teachers_table WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error: ${err}`

            return callback();
        })
    }
}