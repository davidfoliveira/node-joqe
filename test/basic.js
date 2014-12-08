"use strict";

var
	joqe	= require('../joqe'),
	data	= [{nodeType:"story",element_type:"chart_page"},{nodeType:"image",element_type:"photo"},{nodeType:"story",element_type:"news_page"}],
	res;

res = joqe.find(data,'[nodeType="story"][element_type^="news"]');
if ( res.length == 1 && res[0].element_type=="news_page" ) {
	console.log("1:  OK");
	return process.exit(0);
}
console.log("1: FAILED");
process.exit(-1);
