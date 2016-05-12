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
,"嘆":"歎","栗":"粟","厨":"廚","茲":"玆","舘":"館" };

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

var hasNoteAt=function(json,pos) {
	var p=json.offsets.indexOf(pos);
	if (p>-1) {
		while (json.offsets[p]&&json.offsets[p]==pos) {
			if (json.tags[p].substr(0,4)=="note") return true;
			p++;
		}
	}
}

var unpack=function(json){ //unpack offset and tags for faster access
	for (var i in json) {
		json[i].tags=json[i].tags.split("\1");
		json[i].offsets=json[i].offsets.split(",").map(function(o){return parseInt(o)});
	}
}
unpack(t99);
unpack(agama_yinshun);

for (var taisho_sid in t99) {
	var taisho_offset=0;yinshun_offset=0,hasnote=false;

	var yinshun_sid=taisho_yinshun.taisho2yinshun(taisho_sid);
	if (!yinshun_sid) continue;

	var diff=jsdiff.diffChars(t99[taisho_sid].text,agama_yinshun[yinshun_sid].text);
	if (diff.length==1) {
		samecount++;
	} else {
		diff=removeNormalize(diff);
		if (!countDiff(diff)){
			samecount++;
			continue;
		}

		diffcount++;
		console.log("<h2><font color=blue>T"+taisho_sid+"</font>(T02."+t99[taisho_sid].pb+")"+
			"::<font color=red>Y"+yinshun_sid+"</font>("+agama_yinshun[yinshun_sid].pb+")"+"</h2>");
		diff.forEach(function(d){

			if (d.added) {
				yinshun_offset+=d.value.length;
				hasnote=hasNoteAt(agama_yinshun[yinshun_sid],yinshun_offset);

				var key=hasnote?"color":"background";
				console.log("<span style='"+key+":red'>"+d.value+"</span>")
			} else if (d.removed) {
				taisho_offset+=d.value.length;
				hasnote=hasNoteAt(t99[taisho_sid],taisho_offset);
				//var key=hasnote?"color":"background";
				console.log("<span style='color:blue'>"+d.value+"</span>");
			} else {
				taisho_offset+=d.value.length;
				yinshun_offset+=d.value.length;
				console.log(d.value);
			}
		});
		console.log(taisho_offset,yinshun_offset)
	}
	//break;
}
console.log(samecount,diffcount)