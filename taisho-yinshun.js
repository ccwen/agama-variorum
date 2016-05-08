/* */

var fs=require("fs");
var lines=fs.readFileSync("../yinshun-tei/taisho-yinshun.txt","utf8").split(/\r?\n/);
if (lines[0][0]=="#") lines.shift();//comment

var y2t={}, t2y={};

var buildmap=function(){
	var i,j;
	for (i=0;i<lines.length;i++) {
		var cols=lines[i].split("\t");
		var yinshun=cols[0].trim(),taisho=cols[1].trim();

		if (yinshun.indexOf("-")>-1 && taisho) {
			var y=yinshun.split("-"); //range
			var y1=parseInt(y[0]),y2=parseInt(y[1]);
			for (j=y1;j<=y2;j++) {
				y2t[j]=taisho;
			}
		}
		y2t[yinshun]=taisho;

		if (taisho && taisho.indexOf("-")>-1) {
			var t=taisho.split("-"); //range
			var t1=parseInt(t[0]),t2=parseInt(t[1]);
			for (j=t1;j<=t2;j++) {
				t2y[j]=yinshun;
			}
		}
		t2y[taisho]=yinshun;
	}
}
buildmap();
var yinshun2taisho=function(n){
	return y2t[n];
}
var taisho2yinshun=function(n){
	return t2y[n];
}
module.exports={yinshun2taisho,taisho2yinshun};