const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students_table ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database error: ${err}`

            callback(results.rows);
        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO students_table (
                avatar_url,
                name,
                email,
                birth_date,
                grade,
                class_category,
                workload,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.class_category,
            data.workload,
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
                FROM students_table 
                WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error: ${err}`
            callback(results.rows[0]);
        })
    },

    update(data, callback) {
        const query = `
        UPDATE students_table SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth_date=($4),
            grade=($5),
            class_category=($6),
            workload=($7)
        WHERE id = $8
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.class_category,
            data.workload,
            data.id,
        ];

        db.query(query, values, function (err, results) {
            if (err) throw `Database error: ${err}`

            return callback();
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM students_table WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error: ${err}`

            return callback();
        })
    }
}