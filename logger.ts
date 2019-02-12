var fs = require('fs')
import {Context}from "koa";
import {Console} from "console";

var console = new Console(process.stdout); 
var deb = true, inf = true, err = true, aud =true;
module.exports = {
	init : function(options){
		if(typeof options!="undefined"){
			if(options["file"]) {
				var Console = require('console').Console;
				var output = fs.createWriteStream(options["file"])
				console = new Console(output)	
			}
			if(options["mode"]) {
				var mode = options["mode"]
				if(mode.length<=4) {
					deb = false, inf = false, err = false, aud =false;
					for (var i=0; i< mode.length;i++) {
						switch(mode[i]){
							case 'D' : deb = true;
								break;
							case 'I' : inf = true;
								break;
							case 'E' : err = true;
								break;
							case 'A' : aud = true;
								break;
							default :
								break;
						}
					}
				}
			}
		}
	
	},
	get_date : function(callback) {
			var date = new Date();

			var hr = date.getHours();
			const hour = (hr < 10 ? "0" : "") + hr;

			var mn  = date.getMinutes();
			const min = (mn < 10 ? "0" : "") + mn;

			var sc  = date.getSeconds();
			const sec = (sc < 10 ? "0" : "") + sc;

			var year = date.getFullYear();

			var mon = date.getMonth() + 1;
			const month = (mon < 10 ? "0" : "") + mon;

			var d  = date.getDate();
			const day = (d < 10 ? "0" : "") + d;

			callback("[" + year +'-'+ month +'-'+ day + "," + hour + ":" + min + ":" + sec+ "] ");	
		},
	debug : function(log) {
			if(deb === true)
				module.exports.get_date(function(date){
					console.log(date + "DEBUG: "+ log)
				})
		},
	
	info : function(log) {
			if(inf === true)
				module.exports.get_date(function(date){
					console.log(date + "INFO: "+ log)
			})
		},
	error : function(log) {
			if(err === true)
				module.exports.get_date(function(date){
					console.log(date + "ERROR: "+ log)
				})
		},

	audit : function(ctx: Context, log) {
		if(aud === true)
			module.exports.get_date(function(date){
				console.log(date + `AUDIT: UserId-${ctx.mustGetUserId()} ${log}`)
			})
	}
}

