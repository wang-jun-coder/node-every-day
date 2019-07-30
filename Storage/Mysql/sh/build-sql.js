function buildSqlWithArray(array) {
	return array.map(value => {
		return `insert into foo (created) values ('${value}')`
	}).join(';');
};

console.log(JSON.stringify(buildSqlWithArray([
	20190729,
	20180729,
	20170729,
	20160729,
])));