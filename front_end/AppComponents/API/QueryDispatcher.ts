import { LatLng } from 'react-native-maps';

export class SPARQLQueryDispatcher {
	endpoint: string;
	entitiesQuery: string;
	locationQuery: string;
	coords: LatLng;
	range: string;
	constructor(latlong: LatLng, city: string | null, range: string) {
		this.range = range;
		this.coords = latlong;
		this.entitiesQuery = "";
		this.endpoint = 'https://query.wikidata.org/sparql';
		this.locationQuery = `SELECT DISTINCT ?item WHERE {
			?item ?label "${city}"@en;
				wdt:P31 wd:Q515.
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
			}`
	}
	getEntityQuery(cityQid: string) {
		this.entitiesQuery = `SELECT ?place ?placeLabel ?placeDescription ?lat ?long  WHERE {
			?place wdt:P131+ wd:${cityQid} .  # administrative territorial entity
			?place p:P625 ?statement . # coordinate-location statement
			?statement psv:P625 ?coordinate_node .
			?coordinate_node wikibase:geoLatitude ?lat .
			?coordinate_node wikibase:geoLongitude ?long .

			FILTER (ABS(?lat - ${this.coords.latitude}) < ${this.range})
			FILTER (ABS(?long - ${this.coords.longitude}) < ${this.range})

			SERVICE wikibase:label {
				bd:serviceParam wikibase:language "en" .
			}
			} ORDER BY DESC(?lat)
		`
	}

	async query() {
		const locationQueryUrl = this.endpoint + '?query=' + encodeURIComponent(this.locationQuery);
		const headers = { 'Accept': 'application/sparql-results+json' };
		const body = await fetch(locationQueryUrl, { headers });
		const data = await body.json();
		try {
			const res = data.results.bindings[0].item.value.split('/');
			const cityQid = res[res.length - 1];
			this.getEntityQuery(cityQid);
			const entitiesQueryUrl = this.endpoint + '?query=' + encodeURIComponent(this.entitiesQuery);
			return fetch(entitiesQueryUrl, { headers }).then(body_1 => body_1.json());
		} catch (error) {
			console.log(error);
		}

	}
}

