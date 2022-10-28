const describe = require( 'mocha' ).describe;
const it = require( 'mocha' ).it;
const assert = require( 'chai' ).assert;
const deepCopy = require( 'deep-copy' );
const flatten = require( './data/fletten.json' );
const flattenCustom = require( './data/fletten-custom.json' );
const nested = require( './data/nested.json' );

const nestedSetContextFactory = require( '../index' );

describe ( 'flatten to nested [default context]', () => {

	const nestedContext = nestedSetContextFactory();
	
	it ( 'conversion flat to nested can not modify original data', () => {

		const flattenCopy = deepCopy( flatten );
		nestedContext.nest( flatten );
		
		assert.deepEqual( flatten, flattenCopy );
	
	} );

	it ( 'nested must have children and must do not have lft, rgt', () => {

		const nestedCopy = nestedContext.nest(flatten);
		assert.isOk(nestedCopy[0].children);
		assert.isNotOk(nestedCopy[0].lft);
		assert.isNotOk(nestedCopy[0].rgt);
	
	} );

	it ( 'nest output must be equal to ./data/nested.json', () => {

		const nestedCopy = nestedContext.nest( flatten );

		assert.deepEqual( nestedCopy, nested );
	
	} );

} );

describe ( 'flatten to nested [custom context]', () => {

	const nestedCustomContext = nestedSetContextFactory( {

	left: 'customLeft',
	right: 'customRight',
	children: 'customChildren'

	} );

	it ( 'handle custom properties', () => {

		const result = nestedCustomContext.nest( flattenCustom );

		assert.isOk( result[ 0 ].customChildren );
		assert.isNotOk( result[ 0 ].customLeft );
		assert.isNotOk( result[ 0 ].customRight );

	} );

} );

describe ( 'nested to flatten [default context]', () => {

	const nestedContext = nestedSetContextFactory();

	it ( 'rawFlatten === flat(nest(rawFlatten))', () => {

		assert.deepEqual( flatten, nestedContext.flat( nestedContext.nest( flatten ) ) );

	} );

} );
