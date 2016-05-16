/* convert simple xml format into json */
var sid2pb={};
var splitsutra=function(content){
	var texts={},lastsid="",lastidx=0;
	content.replace(/<sid n="(.+?)" pb="(.+?)">/g,function(m,sid,pb,idx){
		if (idx){
			texts[lastsid]=content.substring(lastidx,idx).replace("</sid>","");
		}
		lastidx=idx+m.length;
		lastsid=sid;
		sid2pb[sid]=pb;
	});
	texts[lastsid]=content.substring(lastidx);
	return texts;
}

var extractTag=function(t){
	var tags=[],text="",taglen=0,lastidx=0;
	var offsets=[];
	t.replace(/<.+?>/g,function(m,idx){
		text+=t.substring(lastidx,idx);
		lastidx=idx+m.length;
		tags.push(m);
		offsets.push(idx-taglen);
		taglen+=m.length;
	});

	return {text,tags,offsets};
}
var toJSON=function(content){
	var sutra=splitsutra(content);

	for (var sid in sutra) {
		sutra[sid]=sutra[sid].replace(/\r?\n/g,"<br/>");
		sutra[sid]=sutra[sid].replace(/[。；：，！、（）〔〕［］｛｝？「」—－…『』]/g,function(m){
			return '<punc t="'+m+'"/>';
		});

		var e=extractTag(sutra[sid]);
		e.tags=e.tags.map(function(t){return t.substr(1,t.length-2)}).join("\1");
		e.offsets=e.offsets.join(",");
		sutra[sid]=e;
		sutra[sid].pb=sid2pb[sid];

	}
	return sutra;
}


module.exports={toJSON};
