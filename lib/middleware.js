var log = console.log.bind(console.log, 'moma:')
  , _ = require('lodash')

module.exports = function(opts){
	opts = opts || {};
	var moma = require('./moma')(opts)
	return function (req, res, next) {
		if (shouldProcess(req, res, opts)) {
			processRequest(req, moma, opts);
			processResponse(res, moma, opts);
		}
		next();
	};
}

function shouldProcess(req, res, opts) {
	return true; //@todo filter based on content-type & method
}

function processRequest(req, moma, opts) {
	if(req.body && _.keys(req.body).length) {
		if(moma.mappings['global']) {
			if(opts.verbose) log('applying global mappings')
			req.body = moma.map(req.body, moma.mappings['global']);
		}
		log(req.body)
	}
}

function processResponse(res, moma, opts) {
	var oldWrite = res.write;
	var oldEnd = res.end;
	var chunks = [];
	res.write = function (chunk) {
    	chunks.push(chunk);
		oldWrite.apply(res, arguments);
	};
	res.end = function (chunk) {
    	if (chunk) {
    		chunks.push(chunk);
			try {
				var body = Buffer.concat(chunks).toString('utf8');
				var originalJson = JSON.parse(body);
				var mappedJson = moma.map(originalJson, moma.mappings['global']);
				//@todo send out the mapped json 
			} catch(e) {
	    		chunks.push(chunk);//let non json pass through
			}
    	}
		oldEnd.apply(res, arguments);
  	};
}