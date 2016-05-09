/* mapping table yinshun/yinshun-tei/taisho-yinshun.txt 
	
	t99.json, key: sid, value: text
	agama_yinshun.json

*/

var fs=require("fs");
var taisho_yinshun=require("./taisho-yinshun");
var jsdiff=require("diff");
var t99=require("./t99");
var agama_yinshun=require("./agama_yinshun");
var diffcount=0,samecount=0;
var normalize={"却":"卻","恒":"恆","麤": "麁","甞":"嘗","犍": "揵","猪":"豬" ,"脚": "腳"
,"嘆":"歎","栗":"粟","厨":"廚"};

var removeNormalize=function(diff){
	var out=[],i=0;
	while (i<diff.length) {
		var d=diff[i];
		if (d.removed && diff[i+1] && diff[i+1].added && diff[i+1].value==normalize[d.value]) {
			out.push({value:diff[i+1].value,size:diff[i+1].value.length});
			i+=1;
		} else {
			out.push(d);
		}
		i+=1;
	}
	return out;
}
var countDiff=function(diff){
	var ndiff=0;
	for (var i=0;i<diff.length;i++) {
		if (diff[i].added || diff[i].removed) ndiff++;
	}
	return ndiff;
}
for (var taisho_sid in t99) {
	var yinshun_sid=taisho_yinshun.taisho2yinshun(taisho_sid);
	if (!yinshun_sid) continue;

	var diff=jsdiff.diffChars(t99[taisho_sid],agama_yinshun[yinshun_sid]);
	if (diff.length==1) {
		samecount++;
	} else {
		diff=removeNormalize(diff);
		if (!countDiff(diff)){
			samecount++;
			continue;
		}

		diffcount++;
		console.log("<h2><font color=brown>T"+taisho_sid+"</font>::<font color=green>Y"+yinshun_sid+"</font></h2>");
		diff.forEach(function(d){
			if (d.added) {
				console.log("<font color=green>"+d.value+"</font>")
			} else if (d.removed) {
				console.log("<font color=brown>"+d.value+"</font>");
			} else {
				console.log(d.value);
			}
		});
	}
	
}
console.log(samecount,diffcount)