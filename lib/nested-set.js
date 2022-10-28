const nestedSetContextFactory = ( options = {} ) => {

	const defaultContext = {
		
		left: 'lft',
		right: 'rgt',
		children: 'children',
	
	};

	const context = Object.assign( {}, defaultContext, options );

	const allocateNode = ( hier, node, hMap ) => {

		const hNode = hMap.has( node ) 
			? hMap.get( node ) 
			: { l:node[ context.left ], r:node[ context.right ] };

		delete node[ context.left ];
		delete node[ context.right ];

		hMap.set( node, hNode );

		if ( !hier.length ) {

			hier.push( [] );

		}

		let last = hier[ hier.length - 1 ];

		// If root level.
		if ( !hMap.has( last ) ) {

			last.push( node );
			hier.push( node );
		
		} else if ( hMap.get( last ).r > hMap.get( node ).r ) {

			if( !last[ context.children ] ) {

				last[ context.children ] = [];
			
			}
			
			last[ context.children ].push( node );
			hier.push( node );
		
		} else {

			hier.pop();
			return allocateNode( hier, node, hMap );

		}

		return hier;

	};

	const nest = ( table, treeMap = [], hMap ) => {

		let set = table;

		if ( treeMap.length === 0 ) {

			hMap = new WeakMap();
			set = [ ...set ];
		
		}

		let currentNode = Object.assign( {}, set.shift() );

		treeMap = allocateNode( treeMap, currentNode, hMap );

		if ( !set.length ) {

			return treeMap[ 0 ];

		} else {

			return nest( set, treeMap, hMap );
		
		}
	
	};

	const flat = ( nested, pointer = { i:0 }, flatten = [] ) => {

		for ( let i in nested ) {
			
			let node = nested[ i ];
			let row = Object.assign( {}, node );
			
			flatten.push( row );
			row[ context.left ] = ++pointer.i;
			
			delete row[ context.children ];
			
			if ( node[ context.children ] ) {

				flat( node[ context.children ], pointer, flatten );

			}
			
			row[ context.right ] = ++pointer.i;
		
		}

		return flatten;
	
	};

    return {
        
		nest,
        flat,
    
	}

};

module.exports = nestedSetContextFactory;