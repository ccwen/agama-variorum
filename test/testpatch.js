var assert=require("assert");
var jsdiff=require("diff");
var diffutils=require("../diffutils");
var patch1;
var d1="0123b5678c9";
var d2="0123aa56789";

describe("patch",function(){
	it("create patch",function(){
		var diff=jsdiff.diffChars(d1,d2)
		patch1=diffutils.diffChangeObjectToReplace(diff);
		//assert.equal(patch1.length,2)
	});

	it("apply patch",function(){
		var d=diffutils.applyPatch(d1,patch1);
		assert.equal(d2,d);
	})
});