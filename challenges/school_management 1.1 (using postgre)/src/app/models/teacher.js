const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT teachers.*, count(students) AS total_students 
            FROM teachers
            LEFT JOIN students ON (students.teacher_id = teachers.id)
            GROUP BY teachers.id
            ORDER BY total_students DESC;`, function (err, results) {
            if (err) throw `Database error: ${err}`

            callback(results.rows);
        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO teachers (
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
                FROM teachers
                WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error: ${err}`
            callback(results.rows[0]);
        })
    },

    findBy(filter, callback) {
        db.query(`SELECT teachers.*, count(students) AS total_students 
            FROM teachers
            LEFT JOIN students ON (students.teacher_id = teachers.id)
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.class_category ILIKE '%${filter}%'
            GROUP BY teachers.id
            ORDER BY total_students DESC;`, function (err, results) {
            if (err) throw `Database error: ${err}`

            callback(results.rows);
        })
    },

    update(data, callback) {
        const query = `
        UPDATE teachers SET
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
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error: ${err}`

            return callback();
        })
    }
}