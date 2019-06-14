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
			where += (count === 0)? prop+" = '"+mysqlEscape(options.where[prop].toString())+"'" : ' OR '+prop+" = '"+mysqlEscape(options.where[prop].toString())+"'";
			count++
		}
		query += where;
		console.log(query);
	}
	return db.query(query, function(err, data){
		if (err) return results(err, null);
		else {
			let total = [];
			for (let i = 0; i < data.length; i++) {
				if (!data[i]) return results(null, false);
				else {
					let result = {};
					let fields = options.fields.split(', ');
					fields.forEach(function(item){
						result[item] = data[i][item];
					});
					total.push(result);
				}
		 	}
		 	return results(null, total)
		}
		// else if (data[0]) {
		// 	let result = {};
		// 	let fields = options.fields.split(', ');
		// 	fields.forEach(function(item){
		// 		result[item] = data[0][item];
		// 	});
		// 	return results(null, result);
		// }
		// else return results(null, false);
	});
}

exports.create = function(options, result) {
	let params = {};
	for (let field in options.fields) {
		params[field] = mysqlEscape(options.fields[field].toString());
	}
	let query = 'INSERT INTO '+options.table+' SET ? ';
	//console.log(query);
	return db.query(query, params, function(err, data){
		if (err) return result(err, null);
		else return result(false, 'success');
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