export class SPARQLQueryDispatcher {
    endpoint: string;
	constructor( endpoint: string ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery: string ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}


// const endpointUrl = 'https://query.wikidata.org/sparql';
// const sparqlQuery = `SELECT ?place ?placeLabel ?location WHERE {
//   SERVICE wikibase:box {
//     ?place wdt:P625 ?location .
//     bd:serviceParam wikibase:cornerWest "Point(2.295 48.8738)"^^geo:wktLiteral .
//     bd:serviceParam wikibase:cornerEast "Point(2.33575 48.861088888)"^^geo:wktLiteral .
//   }
//   SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
// }`;

// const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
// queryDispatcher.query( sparqlQuery ).then( console.log );