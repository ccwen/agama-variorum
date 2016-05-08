/* mapping table yinshun/yinshun-tei/taisho-yinshun.txt 
	
	t99.json, key: sid, value: text
	agama_yinshun.json

*/

var fs=require("fs");
var taisho_yinshun=require("./taisho-yinshun");
var jsdiff=require("diff");
var t99=require("./t99");
var agama_yinshun=require("./agama_yinshun");

for (var taisho_sid in t99) {
	var yinshun_sid=taisho_yinshun.taisho2yinshun(taisho_sid);
	if (!yinshun_sid) continue;

	var diff=jsdiff.diffChars(t99[taisho_sid],agama_yinshun[yinshun_sid]);
	if (diff.length>1) {
		console.log(taisho_sid,diff.length)
		diff.forEach(function(part){
			console.log(part)
		});
	}
	
}