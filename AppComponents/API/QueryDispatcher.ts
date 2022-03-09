import { LatLng } from 'react-native-maps';

export class SPARQLQueryDispatcher {
    endpoint: string;
	sparqlQuery: string;
	constructor( latlong: LatLng ) {
		this.endpoint = 'https://query.wikidata.org/sparql';
		this.sparqlQuery = `SELECT ?place ?placeLabel ?placeDescription ?lat ?long  WHERE {
			?place wdt:P131+ wd:Q60 .  # administrative territorial entity = Paris
			?place p:P625 ?statement . # coordinate-location statement
			?statement psv:P625 ?coordinate_node .
			?coordinate_node wikibase:geoLatitude ?lat .
			?coordinate_node wikibase:geoLongitude ?long .

			FILTER (ABS(?lat - 40.72956) < 0.05)
			FILTER (ABS(?long - -73.99645) < 0.05)

			SERVICE wikibase:label {
				bd:serviceParam wikibase:language "en" .
			}
			} ORDER BY DESC(?lat)
		`
	}

	query() {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( this.sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };
		return fetch( fullUrl, { headers } ).then( body => body.json() );
		
	}
}

