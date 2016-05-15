var diffChangeObjectToReplace=function(arr){
	var i=0,offset1=0,offset2=0,out=[];
	while(i<arr.length){
		var d=arr[i];
		console.log(d,offset1,offset2)
		if (d.added || d.removed){
			if (d.removed && arr[i+1] && arr[i+1].added) {
					var next=arr[i+1].value;
					out.push([offset1,d.value,next]);
					offset1+=d.value.length;
					offset2+=next.length;
					i++;
			} else{
					if (d.added) {
						offset2+=d.value.length;
						out.push([offset1,"",d.value]);
					} else {
						offset1+=d.value.length;
						out.push([offset1,d.value,""]);
					}
			}
			
		} else {
			offset1+=d.value.length;
			offset2+=d.value.length;
		}
		i++;
	}
	console.log(offset1,offset2)
	return out;
}
module.exports={diffChangeObjectToReplace};