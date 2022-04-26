import { LatLng } from 'react-native-maps';

export class PropertiesSPARQLQueryDispatcher {
	QID: string;
	endpoint: string;
	recoin_endpoint: string;
	sparqlQuery: string;
	constructor(QID: string) {
		this.QID = QID;
		this.endpoint = 'https://query.wikidata.org/sparql';
		this.recoin_endpoint = `https://recoin.toolforge.org/getmissingattributes.php?lang=en&subject=${QID}&n=10`
		this.sparqlQuery = `SELECT ?wd ?wdLabel ?ps_Label {
			VALUES (?company) {(wd:${QID})}

			?company ?p ?statement .
			?statement ?ps ?ps_ .

			?wd wikibase:claim ?p.
			?wd wikibase:statementProperty ?ps.

			OPTIONAL {
			?statement ?pq ?pq_ .
			?wdpq wikibase:qualifier ?pq .
			}

			SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
			} ORDER BY ?wd ?statement ?ps_`;
	}

	async queryProperties() {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent(this.sparqlQuery);
		const headers = { 'Accept': 'application/sparql-results+json' };
		const body = await fetch(fullUrl, { headers });
		return await body.json();
		//.then( response => console.log(response))
	}

	async queryMissingProperties() {
		const body = await fetch(this.recoin_endpoint);
		return await body.json();
	}
}

