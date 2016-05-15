var assert=require("assert");
var jsdiff=require("diff");
var diffutils=require("../diffutils");

describe("patch",function(){
	it("test1",function(){
		var d1="a12345678aa";
		var d2="012345678b";
		var diff=jsdiff.diffChars(d1,d2);
		var arr=diffutils.diffChangeObjectToReplace(diff);
		console.log(arr)
	});
});