import { LatLng } from 'react-native-maps';

export class SPARQLQueryDispatcher {
    endpoint: string;
	entitiesQuery: string;
	locationQuery: string;
	coords: LatLng;
	constructor( latlong: LatLng, city: string | null,) {
		this.coords = latlong;
		this.entitiesQuery = "";
		this.endpoint = 'https://query.wikidata.org/sparql';
		this.locationQuery=`SELECT DISTINCT ?item WHERE {
			?item ?label "${city}"@en;
				wdt:P31 wd:Q515.
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
			}`
	}
	getEntityQuery(cityQid: string){
		this.entitiesQuery = `SELECT ?place ?placeLabel ?placeDescription ?lat ?long  WHERE {
			?place wdt:P131+ wd:${cityQid} .  # administrative territorial entity
			?place p:P625 ?statement . # coordinate-location statement
			?statement psv:P625 ?coordinate_node .
			?coordinate_node wikibase:geoLatitude ?lat .
			?coordinate_node wikibase:geoLongitude ?long .

			FILTER (ABS(?lat - ${this.coords.latitude}) < 0.008)
			FILTER (ABS(?long - ${this.coords.longitude}) < 0.008)

			SERVICE wikibase:label {
				bd:serviceParam wikibase:language "en" .
			}
			} ORDER BY DESC(?lat)
		`
	} 

	query() {
		
		const locationQueryUrl = this.endpoint + '?query=' + encodeURIComponent( this.locationQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };
		return fetch( locationQueryUrl, { headers } ).then( body => body.json() )
		.then(data => {
			const res = data.results.bindings[0].item.value.split('/');
			const cityQid = res[res.length - 1]
			this.getEntityQuery(cityQid);
			const entitiesQueryUrl = this.endpoint + '?query=' + encodeURIComponent( this.entitiesQuery );
			console.log(this.entitiesQuery)
			return fetch( entitiesQueryUrl, { headers } ).then( body => body.json() )
		});
		
	}
}

