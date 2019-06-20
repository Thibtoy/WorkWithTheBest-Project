const db = require('./mysql.js');

function mysqlEscape(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

exports.find = function(options, results) {
	let query = 'SELECT '+options.fields+' FROM '+options.table;
	if (options.where) {
		let where = ' WHERE ';
		let count = 0;
		for (let prop in options.where){
			if (prop === 'andlike') {
				for (let underprop in options.where[prop]){
					options.where[prop][underprop].forEach(function(item, i){
						where += (i === 0)? underprop+" LIKE '%"+mysqlEscape(item.toString())+"%'" : ' AND '+underprop+" LIKE %'"+mysqlEscape(item.toString())+"'";
					})
				}
			}
			else {
				where += (count === 0)? prop+" = '"+mysqlEscape(options.where[prop].toString())+"'" : ' OR '+prop+" = '"+mysqlEscape(options.where[prop].toString())+"'";
				count++
			}
		}
		query += where;
	}
	console.log(query);
	return db.query(query, function(err, data){
		if (err) return results(err, null);
		else if(data.length === 0) return results(null, false);
		else if(data.length === 1) return results(null, data[0]);
		else {
			let total = [];
			for (let i = 0; i < data.length; i++) {
					let result = {};
					let fields = options.fields.split(', ');
					fields.forEach(function(item){
						result[item] = data[i][item];
					});
					total.push(result);				
		 	}
		 	return results(null, total);
		}
	});
}

exports.create = function(options, result) {
	let params = {};
	for (let field in options.fields) {
		params[field] = mysqlEscape(options.fields[field].toString());
	}
	let query = 'INSERT INTO '+options.table+' SET ? ';
	console.log(query);
	return db.query(query, params, function(err, data){
		if (err) return result(err, null);
		else return result(false, data);
	})
}

exports.test = function(options) {
	return new Promise(function(resolve, reject) {
		let params = {};
		for (let field in options.fields) {
			params[field] = mysqlEscape(options.fields[field].toString());
		}
		let query = 'INSERT INTO '+options.table+' SET ? ';
		//console.log(query);
		return db.query(query, params, function(err, data){
			if (err) return reject(err);
			else return resolve(data.insertId);
		})
	})
}

exports.update = function(options) {
	return new Promise(function(resolve, reject) {
		let query = 'UPDATE '+options.table+' SET';
		let length = Object.keys(options.fields).length;
		let count = 0;
		let values = [];
		for (let field in options.fields) {
			count++			
			values.push(mysqlEscape(options.fields[field].toString()));
			query += (count === length)? ' '+field+'= ?':' '+field+'= ?,';
		}
		let where = ' WHERE '
		count = 0;
		for (let prop in options.where){
			where += (count === 0)? prop+' = ?': ' OR '+prop+' = ?';
			values.push(mysqlEscape(options.where[prop].toString()))
			count++
		}
		query += where; 
		return db.query(query, values, function(error, result){
			if (error) reject(error);
			resolve('success');			
		})		
	})
}