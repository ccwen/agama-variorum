var fs=require("fs");
var taisho_yinshun=require("./taisho-yinshun");
var jsdiff=require("diff");
var t99=require("./t99");
var agama_yinshun=require("./agama_yinshun");
var normalize=require("./normalizechar");
var diffutils=require("./diffutils");
var i,j;
for (j in normalize) {
	var from=new RegExp(j,"g");
	for (i in agama_yinshun){
		agama_yinshun[i].text=agama_yinshun[i].text.replace(from,normalize[j])	;	
	}
}
var out={};

for (taisho_sid in t99) {	
		var yinshun_sid=taisho_yinshun.taisho2yinshun(taisho_sid);
		if (!yinshun_sid) continue;
		if (!t99[taisho_sid].text.length) {
			console.log(taisho_sid,"has no content")
			continue;
		}
		var diff=jsdiff.diffChars(t99[taisho_sid].text,agama_yinshun[yinshun_sid].text );
		var patch1=diffutils.diffChangeObjectToReplace(diff);
		if (patch1.length) out[yinshun_sid]=patch1;
}


fs.writeFileSync("diff.json",JSON.stringify(out,""," "),"utf8");