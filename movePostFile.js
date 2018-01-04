#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const path = './'
const list = [];

checkForPosting(path);
process.exit(1)

function isDirectory(path) {
	return fs.lstatSync(path).isDirectory();
}

function isMarkdown(fileName) {
	return /\.md$/.test(fileName);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, [year, month, day].join('-')];  // [2018, 2018-01-03]
}

function getLastModifiedDate(fileName) {
	var absPath = __dirname + '/' + fileName;
	var stats = fs.statSync(absPath);
	return (formatDate(stats.mtime.toString()));
}

function checkForPosting(path) {

	fs.readdirSync(path).forEach(function(fileName){

		const subPath = path + '/' + fileName;

		if(isDirectory(subPath)) {
			return;
		}
		if ((fileName == 'about.md') || (fileName == 'README.md')) {
			return;
		}
		if(isMarkdown(fileName)) {
			createDate = getLastModifiedDate(fileName);
			console.log(createDate);
			var newFileName = __dirname + '/_posts/' + createDate[0] + '/' + createDate[1] + '-' + fileName;
			console.log(newFileName);
			fs.rename(fileName, newFileName);
		}
	});
}
