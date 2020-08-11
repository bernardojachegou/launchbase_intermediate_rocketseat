const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM members ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database error!: ${err}`

            callback(results.rows);
        })
    },

    create(data, callback) {
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).format,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            date(Date.now()).iso
        ];

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!: ${err}`

            callback(results.rows[0])
        });

    },

    find(id, callback) {
        db.query(`
                SELECT * 
                FROM members 
                WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error!: ${err}`
            callback(results.rows[0]);
        })
    },

    update(data, callback) {
        const query = `
        UPDATE members SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth=($4),
            gender=($5),
            blood=($6),
            weight=($7),
            height=($8)

        WHERE id = $9
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).format,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!: ${err}`

            return callback();
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Databse error: ${err}`

            return callback();
        })
    }

}