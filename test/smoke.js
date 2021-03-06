var log = console.log.bind(console.log, 'moma tests:')
  , should = require('chai').should()
  , moma = require('..').lib({verbose:true, mappings:'./test/mappings.json'})
  , data = require('./test_data.json')

describe('setup', function(){
	it('should find and load mappings', function(){
		should.exist(moma)
		should.exist(moma.mappings);
	});
});
describe('basic mapping', function(){
	it('should map models using nominal mappings', function(){
		var out = moma.map(data.test1, moma.mappings['m1'])
		should.exist(out)
		out.should.have.property('field1_out');
		out['field1_out'].should.equal('field1_value')
	});
	it('should map models with multiple fields', function(){
		var out = moma.map(data.test2, moma.mappings['m4'])
		should.exist(out)
		out.should.have.property('field1_out');
		out['field1_out'].should.equal('field1_value')
		out.should.have.property('field2_out');
		out['field2_out'].should.equal('field2_value')
		out.should.have.property('field3_out');
		out['field3_out'].should.equal('field3_value')
		out.should.have.property('field4_out');
		out['field4_out'].should.equal('field4_value')
	});
	it('should block unmapped fields by default', function(){
		var out = moma.map(data.test1, moma.mappings['m1'])
		should.exist(out)
		out.should.have.property('field1_out');
		out['field1_out'].should.equal('field1_value')
		out.should.not.have.property('field2_name');
	});
	it('should block fields if explicitly requested', function(){
		var out = moma.map(data.test1, moma.mappings['m2'])
		should.exist(out)
		out.should.have.property('field1_out');
		out['field1_out'].should.equal('field1_value')
		out.should.not.have.property('field2_name');
	});
	it('should allow fields if explicitly requested', function(){
		var out = moma.map(data.test1, moma.mappings['m3'])
		should.exist(out)
		out.should.have.property('field1_out');
		out['field1_out'].should.equal('field1_value')
		out.should.have.property('field2_name');
		out['field2_name'].should.equal('field2_value')
	});
});
describe('global mapping', function(){
	it('should map models using global mappings', function(){
		var out = moma.map(data.test4)
		should.exist(out)
		out.should.have.property('global99_out');
		out['global99_out'].should.equal('field99_value')
	});
});
describe.skip('hierarchical mapping', function(){
	it('should map qualified fields in hierarchical models using dot notation', function(){
	});
	it('should map qualified fields in hierarchical models using expanded notation', function(){
	})
	it('should map unique non-qualified fields in hierarchical models', function(){
	});
	it('should not map duplicate fields in hierarchical models by default', function(){
	});
	it('should map all duplicate fields in hierarchical models if explicitly requested', function(){
	});
})
