var sep=String.fromCharCode(1);

var diffChangeObjectToReplace=function(arr){
	var i=0,offset1=0,offset2=0,out=[];
	while(i<arr.length){
		var d=arr[i];
		//console.log(d,offset1,offset2)
		if (d.added || d.removed){
			if (d.removed && arr[i+1] && arr[i+1].added) {
					var next=arr[i+1].value;
					out.push([offset1,d.value,next].join(sep));
					offset1+=d.value.length;
					offset2+=next.length;
					i++;
			} else{
					if (d.added) {
						out.push([offset1,"",d.value].join(sep));
						offset2+=d.value.length;
					} else {
						out.push([offset1,d.value,""].join(sep));
						offset1+=d.value.length;
					}
			}
			
		} else {
			offset1+=d.value.length;
			offset2+=d.value.length;
		}
		i++;
	}
	return out;
}
var applyPatch=function(source,patch){
	var target=source;
	for (var i=patch.length-1;i>=0;i--) {
		var p=patch[i].split(sep);
		target=target.substr(0,p[0])+p[2]+target.substr(p[0]+p[1].length);
	}
	return target;
}
module.exports={diffChangeObjectToReplace,applyPatch};