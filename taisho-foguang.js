/* */

var fs=require("fs");
var lines=fs.readFileSync("../fgs_agama/foguang-taisho.txt","utf8").split(/\r?\n/);
if (lines[0][0]=="#") lines.shift();//comment

var f2t={}, t2f={};

var buildmap=function(){
	var i,j;
	for (i=0;i<lines.length;i++) {
		var cols=lines[i].split("\t");
		var foguang=cols[0].trim(),taisho=cols[1].trim();

		if (foguang.indexOf("-")>-1 && taisho) {
			var f=foguang.split("-"); //range
			var f1=parseInt(f[0]),f2=parseInt(f[1]);
			for (j=f1;j<=f2;j++) {
				f2t[j]=taisho;
			}
		}
		f2t[foguang]=taisho;

		if (taisho && taisho.indexOf("-")>-1) {
			var t=taisho.split("-"); //range
			var t1=parseInt(t[0]),t2=parseInt(t[1]);
			for (j=t1;j<=t2;j++) {
				t2f[j]=foguang;
			}
		}
		t2f[taisho]=foguang;
	}
}
buildmap();
var foguang2taisho=function(n){
	return f2t[n];
}
var taisho2foguang=function(n){
	return t2f[n];
}
module.exports={foguang2taisho,taisho2foguang};