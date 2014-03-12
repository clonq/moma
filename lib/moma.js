var log = console.log.bind(console.log, 'moma:')
  , fs = require('fs')
  , _ = require('lodash')

const DEFAULT_MAPPINGS_FILENAME = 'moma.json';

module.exports = function(opts) {
	this.opts = opts || {};
	try {
		this.mappings = loadMappings(opts);
	} catch (e) {
		log(e)
	}
	return {
		mappings: this.mappings,
		map: function(model, mapping){
			var ret = {};
			var pairs = _.pairs(model)
			var unmapped_fields
			var allowUnmappedFields = mapping && mapping.meta && mapping.meta.unmapped_fields && (mapping.meta.unmapped_fields == 'allow');
			mapping  = mapping || this.mappings['global'];
			_.each(_.pairs(model), function(it){
				var value = it[1];
				var oldKey = it[0];
				var newKey = mapping.mappings[oldKey];
				if(newKey) ret[newKey] = value;
				else {
					if(allowUnmappedFields) ret[oldKey] = value;
				}
			})
			return ret;
		}
	}
}

function loadMappings(opts) {
	var ret;
	var opts = opts || {};
	var mappingsFilename = (opts.mappings) ? opts.mappings : DEFAULT_MAPPINGS_FILENAME;
	if(fs.existsSync(mappingsFilename)) {
		ret = JSON.parse(fs.readFileSync(mappingsFilename));
		var mappingsCount = _.keys(ret).length;
		var mappingsList = mappingsCount ? ' ('+_.keys(ret).join(', ')+')' : '';
		var plural = (mappingsCount>1 || mappingsCount==0)?"s":"";
		if(opts.verbose) log(mappingsCount + ' mapping' + plural + mappingsList + ' loaded from', mappingsFilename);
	} else {
		log('Mappings filename not found:', mappingsFilename);
	}
	return ret;
}