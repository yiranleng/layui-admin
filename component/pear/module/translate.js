/*
 * 多语言翻译，作者：管雷鸣
 */      
layui.define(['table', 'form', 'element'], function (exports) {
	//下行是直接将https://gitee.com/mail_osc/translate 压缩后粘贴过来
	var translate={version:"2.1.6.20230108",useVersion:"v1",setUseVersion2:function(){this.useVersion="v2"},translate:null,includedLanguages:"zh-CN,zh-TW,en",resourcesUrl:"//res.zvo.cn/translate",selectLanguageTag:{show:!0,languages:"zh-CN,zh-TW,en",alreadyRender:!1,render:function(){if(!translate.selectLanguageTag.alreadyRender&&(translate.selectLanguageTag.alreadyRender=!0,translate.selectLanguageTag.show)){if(null==document.getElementById("translate")){var e=document.getElementsByTagName("body")[0],t=document.createElement("div");t.id="translate",e.appendChild(t)}else if(null!=document.getElementById("translateSelectLanguage"))return;translate.request.post("https://api.translate.zvo.cn/language.json",{},function(e){if(0!=e.result){var t=function(e){var t=e.target.value;translate.changeLanguage(t)},n=document.createElement("select");n.id="translateSelectLanguage",n.className="translateSelectLanguage";for(var a=0;a<e.list.length;a++){var s=document.createElement("option");s.setAttribute("value",e.list[a].id),null!=translate.to&&void 0!==translate.to&&translate.to==e.list[a].id&&s.setAttribute("selected","selected"),s.appendChild(document.createTextNode(e.list[a].name)),n.appendChild(s)}window.addEventListener?n.addEventListener("change",t,!1):n.attachEvent("onchange",t),document.getElementById("translate").appendChild(n)}else console.log("load language list error : "+e.info)})}}},localLanguage:"zh-CN",googleTranslateElementInit:function(){var e="";null!=document.getElementById("translate")&&(e="translate"),translate.translate=new google.translate.TranslateElement({pageLanguage:"zh-CN",includedLanguages:translate.selectLanguageTag.languages,layout:0},e)},init:function(){var e=window.location.protocol;"file:"==window.location.protocol&&(e="http:"),-1==this.resourcesUrl.indexOf("://")&&(this.resourcesUrl=e+this.resourcesUrl)},execute_v1:function(){if(null==document.getElementById("translate")&&translate.selectLanguageTag.show){var e=document.getElementsByTagName("body")[0],t=document.createElement("div");t.id="translate",e.appendChild(t)}"zh-CN,zh-TW,en"!=translate.includedLanguages&&(translate.selectLanguageTag.languages=translate.includedLanguages,console.log("translate.js tip: translate.includedLanguages obsolete, please use the translate.selectLanguageTag.languages are set"));var n=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript",a.src=this.resourcesUrl+"/js/element.js",n.appendChild(a)},setCookie:function(e,t){var n=e+"="+escape(t);document.cookie=n},getCookie:function(e){for(var t=document.cookie.split("; "),n=0;n<t.length;n++){var a=t[n].split("=");if(a[0]==e)return unescape(a[1])}return""},currentLanguage:function(){translate.check();var e=translate.getCookie("googtrans");return e.length>0?e.substr(e.lastIndexOf("/")+1,e.length-1):translate.localLanguage},changeLanguage:function(e){if(",en,de,hi,lt,hr,lv,ht,hu,zh-CN,hy,uk,mg,id,ur,mk,ml,mn,af,mr,uz,ms,el,mt,is,it,my,es,et,eu,ar,pt-PT,ja,ne,az,fa,ro,nl,en-GB,no,be,fi,ru,bg,fr,bs,sd,se,si,sk,sl,ga,sn,so,gd,ca,sq,sr,kk,st,km,kn,sv,ko,sw,gl,zh-TW,pt-BR,co,ta,gu,ky,cs,pa,te,tg,th,la,cy,pl,da,tr,".indexOf(","+e+",")>-1){translate.check();var t="/"+translate.localLanguage+"/"+e,n=document.location.host.split(".");if(n.length>2){var a=n[n.length-2]+"."+n[n.length-1];document.cookie="googtrans=;expires="+new Date(1)+";domain="+a+";path=/",document.cookie="googtrans="+t+";domain="+a+";path=/"}return translate.setCookie("googtrans",""+t),void location.reload()}this.setUseVersion2(),this.to=e,translate.storage.set("to",e),location.reload()},check:function(){"file:"==window.location.protocol&&console.log("\r\n---WARNING----\r\ntranslate.js 主动翻译组件自检异常，当前协议是file协议，翻译组件要在正常的线上http、https协议下才能正常使用翻译功能\r\n------------")},to:"",autoDiscriminateLocalLanguage:!1,documents:[],ignore:{tag:["style","script","img","head","link","i","pre","code"],class:["ignore","translateSelectLanguage"]},setAutoDiscriminateLocalLanguage:function(){this.autoDiscriminateLocalLanguage=!0},nodeQueue:{},setDocuments:function(e){null!=e&&void 0!==e&&(void 0===e.length?this.documents[0]=e:this.documents=e,this.nodeQueue={})},listener:{isExecuteFinish:!1,isStart:!1,start:function(){translate.temp_linstenerStartInterval=setInterval(function(){"complete"==document.readyState&&(clearInterval(translate.temp_linstenerStartInterval),translate.listener.addListener())},50)},addListener:function(){translate.listener.isStart=!0;const e=document;new MutationObserver(function(e,t){var n=[];for(let t of e)"childList"===t.type&&t.addedNodes.length>0&&(n.push.apply(n,t.addedNodes),console.log(t.addedNodes));n.length>0&&(translate.setDocuments(n),translate.execute())}).observe(e,{attributes:!0,childList:!0,subtree:!0})}},renderTask:class{constructor(){this.taskQueue=[],this.nodeQueue=[]}add(e,t,n){var a=translate.util.hash(e.nodeValue);void 0===this.nodeQueue[a]&&(this.nodeQueue[a]=new Array),this.nodeQueue[a].push(e);var s=this.taskQueue[a];null!=s&&void 0!==s||(s=new Array);var o=new Array;o.originalText=t,o.resultText=n,s.push(o),this.taskQueue[a]=s}execute(){for(var e in this.taskQueue){(t=this.taskQueue[e]).sort(function(e,t){return t.originalText.length-e.originalText.length}),this.taskQueue[e]=t}for(var e in this.nodeQueue)for(var t=this.taskQueue[e],n=0;n<this.nodeQueue[e].length;n++)for(var a=0;a<t.length;a++){var s=t[a];this.nodeQueue[e][a].nodeValue=this.nodeQueue[e][a].nodeValue.replace(new RegExp(s.originalText,"g"),s.resultText)}}},execute:function(e){if("undefined"!=typeof doc&&(this.useVersion="v2"),"v1"!=this.useVersion){var t=translate.util.uuid();if(this.nodeQueue[t]=new Array,null==this.to||""==this.to){var n=this.storage.get("to");null!=n&&void 0!==n&&n.length>0&&(this.to=n)}try{this.selectLanguageTag.render()}catch(e){console.log(e)}if(null!=this.to&&void 0!==this.to&&0!=this.to.length){var a;if(void 0!==e){if(null==e)return void cnosole.log("translate.execute(...) 中传入的要翻译的目标区域不存在。");void 0===e.length?(a=new Array)[0]=e:a=documents}else a=null!=this.documents&&void 0!==this.documents&&this.documents.length>0?this.documents:document.all;for(var s=0;s<a.length&s<20;s++){var o=a[s];this.whileNodes(t,o)}var r={},l={};for(var i in this.nodeQueue[t]){if(null==i||void 0===i||0==i.length||"undefined"==i)continue;r[i]=[],l[i]=[];let e=new translate.renderTask;for(var u in this.nodeQueue[t][i]){var d=this.nodeQueue[t][i][u].original,c=this.storage.get("hash_"+translate.to+"_"+u);if(null!=c&&c.length>0)for(var g=0;g<this.nodeQueue[t][i][u].nodes.length;g++)e.add(this.nodeQueue[t][i][u].nodes[g],d,c);else r[i].push(d),l[i].push(u)}e.execute()}var h=[];for(var i in this.nodeQueue[t])r[i].length<1||h.push(i);if(translate.listener.isExecuteFinish||(translate.temp_executeFinishNumber=0,translate.temp_executeFinishInterval=setInterval(function(){translate.temp_executeFinishNumber==h.length&&(translate.listener.isExecuteFinish=!0,clearInterval(translate.temp_executeFinishInterval))},50)),0!=h.length)for(var f in h){i=h[f];if(r[i].length<1)return;var v={from:i,to:this.to,text:encodeURIComponent(JSON.stringify(r[i]))};this.request.post("https://api.translate.zvo.cn/translate.json",v,function(e){if(0==e.result)return console.log("=======ERROR START======="),console.log(r[e.from]),console.log("response : "+e.info),console.log("=======ERROR END  ======="),void translate.temp_executeFinishNumber++;console.log("response:"+t);let n=new translate.renderTask;for(var a=0;a<l[e.from].length;a++){for(var s=e.text[a],o=l[e.from][a],i=e.from,u=translate.nodeQueue[t][i][o].original,d=0;d<translate.nodeQueue[t][i][o].nodes.length;d++)n.add(translate.nodeQueue[t][i][o].nodes[d],u,s);translate.storage.set("hash_"+e.to+"_"+o,s)}n.execute(),translate.temp_executeFinishNumber++})}}else this.autoDiscriminateLocalLanguage&&this.executeByLocalLanguage()}else this.execute_v1()},whileNodes:function(e,t){if(null!=t&&void 0!==t){var n=t.childNodes;if(n.length>0)for(var a=0;a<n.length;a++)this.whileNodes(e,n[a]);else this.findNode(e,t)}},findNode:function(e,t){if(null!=t&&void 0!==t&&null!=t.parentNode){var n=t.parentNode.nodeName;if(null!=n&&!(this.ignore.tag.indexOf(n.toLowerCase())>-1)){for(var a=!1,s=t.parentNode;t!=s&&null!=s;)null!=s.className&&this.ignore.class.indexOf(s.className)>-1&&(a=!0),s=s.parentNode;if(!a)if("INPUT"==t.nodeName||"TEXTAREA"==t.nodeName){if(null==t.attributes||void 0===t.attributes)return;void 0!==t.attributes.placeholder&&this.addNodeToQueue(e,t.attributes.placeholder)}else if(null!=t.nodeValue&&t.nodeValue.trim().length>0){if(!(null!=t.nodeValue&&"string"==typeof t.nodeValue&&t.nodeValue.length>0))return;this.addNodeToQueue(e,t)}}}},addNodeToQueue:function(e,t){if(null!=t.nodeValue&&0!=t.nodeValue.length){this.util.hash(t.nodeValue);if(!this.util.findTag(t.nodeValue)){var n=this.language.get(t.nodeValue);for(var a in void 0!==n[translate.to]&&delete n[translate.to],n){null!=this.nodeQueue[e][a]&&void 0!==this.nodeQueue[e][a]||(this.nodeQueue[e][a]=new Array);for(var s=0;s<n[a].length;s++){var o=n[a][s],r=this.util.hash(o);null!=this.nodeQueue[e][a][r]&&void 0!==this.nodeQueue[e][a][r]||(this.nodeQueue[e][a][r]=new Array,this.nodeQueue[e][a][r].nodes=new Array,this.nodeQueue[e][a][r].original=o),this.nodeQueue[e][a][r].nodes[this.nodeQueue[e][a][r].nodes.length]=t}}}}},language:{get:function(e){for(var t=new Array,n=new Array,a="",s=0;s<e.length;s++){var o=e.charAt(s),r=translate.language.getCharLanguage(o);""==r&&(r="unidentification"),n=translate.language.analyse(r,n,a,o),a=r,t.push(r)}return void 0!==n.unidentification&&delete n.unidentification,void 0!==n.specialCharacter&&delete n.specialCharacter,n},getCharLanguage:function(e){return null==e||void 0===e?"":this.specialCharacter(e)?"specialCharacter":this.chinese_simplified(e)?"chinese_simplified":this.english(e)?"english":this.japanese(e)?"japanese":this.korean(e)?"korean":(console.log("not find is language , char : "+e+", unicode: "+e.charCodeAt(0).toString(16)),"")},analyse:function(e,t,n,a){void 0===t[e]&&(t[e]=new Array);var s=0;return""==n||(s=n==e?t[e].length-1:t[e].length),void 0===t[e][s]&&(t[e][s]=""),t[e][s]=t[e][s]+a,t},chinese_simplified:function(e){return!!/.*[\u4e00-\u9fa5]+.*$/.test(e)},english:function(e){return!!/.*[\u0041-\u005a]+.*$/.test(e)||!!/.*[\u0061-\u007a]+.*$/.test(e)},japanese:function(e){return!!/.*[\u0800-\u4e00]+.*$/.test(e)},korean:function(e){return!!/.*[\uAC00-\uD7AF]+.*$/.test(e)},specialCharacter:function(e){return!!/.*[\u2460-\u24E9]+.*$/.test(e)||(!!/.*[\u2500-\u25FF]+.*$/.test(e)||(!!/.*[\u3200-\u33FF]+.*$/.test(e)||(!!/.*[\uFF00-\uFF5E]+.*$/.test(e)||(!!/.*[\u2000-\u22FF]+.*$/.test(e)||(!!/.*[\u3001-\u3036]+.*$/.test(e)||(!!/.*[\u0020-\u007e]+.*$/.test(e)||(!!/.*[\u0009\u000a\u0020\u00A0\u1680\u180E\u202F\u205F\u3000\uFEFF]+.*$/.test(e)||(!!/.*[\u2000-\u200B]+.*$/.test(e)||(!!/.*[\u00A1-\u0105]+.*$/.test(e)||!!/.*[\u2C60-\u2C77]+.*$/.test(e))))))))))}},executeByLocalLanguage:function(){this.request.post("https://api.translate.zvo.cn/ip.json",{},function(e){0==e.result?(console.log("==== ERROR 获取当前用户所在区域异常 ===="),console.log(e.info),console.log("==== ERROR END ====")):(translate.setUseVersion2(),translate.storage.set("to",e.language),translate.to=e.language,translate.selectLanguageTag,translate.execute())})},util:{uuid:function(){var e=(new Date).getTime();return window.performance&&"function"==typeof window.performance.now&&(e+=performance.now()),"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?n:3&n|8).toString(16)})},findTag:function(e){return/<[^>]+>/g.test(e)},arrayFindMaxNumber:function(e){for(var t={},n=[],a=0,s=0,o=e.length;s<o;s++)t[e[s]]?t[e[s]]++:t[e[s]]=1,t[e[s]]>a&&(a=t[e[s]]);for(var r in t)t[r]===a&&n.push(r);return n},hash:function(e){if(null==e||void 0===e)return e;var t,n=0;if(0===e.length)return n;for(t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return n+""},charReplace:function(e){return null==e?"":e=(e=e.trim()).replace(/\t|\n|\v|\r|\f/g,"")}},request:{post:function(e,t,n){this.send(e,t,n,"post",!0,{"content-type":"application/x-www-form-urlencoded"},null)},send:function(e,t,n,a,s,o,r){var l="";if(null!=t)for(var i in t)l.length>0&&(l+="&"),l=l+i+"="+t[i];var u=null;try{u=new XMLHttpRequest}catch(e){u=new ActiveXObject("Microsoft.XMLHTTP")}if(u.open(a,e,s),null!=o)for(var i in o)u.setRequestHeader(i,o[i]);u.send(l),u.onreadystatechange=function(){if(4==u.readyState)if(200==u.status){var e=null;try{e=JSON.parse(u.responseText)}catch(e){console.log(e)}n(null==e?u.responseText:e)}else null!=r&&r(u)}}},storage:{set:function(e,t){localStorage.setItem(e,t)},get:function(e){return localStorage.getItem(e)}}};try{translate.init()}catch(e){console.log(e)}
	
	//默认就是用新的v2版本
	translate.setUseVersion2();
	window.translate = translate;
	//输出 translate 接口
  	exports('translate', translate);
});