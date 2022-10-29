const cloneDeep = require( 'lodash/cloneDeep' );

const nestedSetContextFactory = ( options = {} ) => {

	const context = Object.assign( {}, {

		left: 'lft',
		right: 'rgt',
		level: 'lvl',
		children: 'children',

	}, options );

	const nest = ( nodeList = [], parentNode ) => {
		
		// Parsing and sorting nodes. 
		const newArray = cloneDeep( nodeList ).map( node => {

			for ( const key in node ) {

				node[ key ] = +node[ key ] || node[ key ];
			
			}

			return node;

		} ).sort( ( a, b ) => +a[ context.left ] - ( +b[ context.left ] ) );
	
		// Initial value of parentNode and children list.
		parentNode = parentNode || newArray[ 0 ];
		
		parentNode[ context.children ] = [];
		
		// Convert Nested Set to Tree structure.
		for ( let i = 0; i < newArray.length; i++ ) {
			
			const lvl = newArray[ i ][ context.level ] > parentNode[ context.level ] 
				&& ( newArray[ i ][ context.level ] < ( parentNode[ context.level ] ) + 2 );
			
			const lft = newArray[ i ][ context.left ] > parentNode[ context.left ];  
			const rgt = newArray[ i ][ context.right ] < parentNode[ context.right ];
			
			if ( lvl && lft && rgt ) {

				parentNode.children.push( newArray[ i ] );

			}
		
		}
		
		// Recursion makes Tree for each child.
		parentNode[ context.children ].forEach( node => {

			node[ context.children ] = [];
			nest( newArray, node );

		})
		
		const outArray = [];
		outArray.push( parentNode );
		
		return outArray;
	
	};

	const flat = ( nested, pointer = { i: 0 }, flatten = [] ) => {

		nested.forEach( node => {
			
			const row = Object.assign( {}, node );
			
			flatten.push( row );
			
			row[ context.left ] = ++pointer.i;
			
			delete row[ context.children ];
			
			if ( node[ context.children ] ) {

				flat( node[ context.children ], pointer, flatten );

			}
			
			row[ context.right ] = ++pointer.i;
		
		} );

		return flatten;
	
	};

    return {
        
		nest,
        flat,
    
	}

};

module.exports = nestedSetContextFactory;
