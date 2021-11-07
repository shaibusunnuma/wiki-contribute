export type Entity = {
  a : Object;
  aLabel: {value: string};
  lat: {value: number};
  long: {value: number};
}

type WikiContextState = {
    entities : Entity[];
}

export type Mark = {
    coordinates: LatLng;
    title: string;
    description: string;
}