/* 
  generate a easy-to-diff json from xml
  yinshun/yinshun-tei/agama-yinshun.xml
  ksanaforge/cbeta2014_paraser/t99.xml
*/

var fs=require("fs");
var xml2json=require("./xml2json");
//console.log(taisho_yinshun.yinshun2taisho(113));
//console.log(taisho_yinshun.taisho2yinshun(100));

var t99=xml2json.toJSON(fs.readFileSync("../cbeta2014_parser/t99.xml","utf8"));
var agama_yinshun=xml2json.toJSON(fs.readFileSync("../yinshun-tei/agama-yinshun.xml","utf8"));

console.log('t99 sutra count',Object.keys(t99).length);
console.log('agama_yinshun sutra count',Object.keys(agama_yinshun).length);
fs.writeFileSync("t99.js","module.exports="+JSON.stringify(t99,""," "),"utf8");
fs.writeFileSync("agama_yinshun.js","module.exports="+JSON.stringify(agama_yinshun,""," "),"utf8")
