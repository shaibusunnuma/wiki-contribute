export type Entity = {
  a : Object;
  aLabel: Object;
  lat: Object;
  long: Object;
}

type WikiContextState = {
    entities : Entity[];
}

export type Mark = {
    coordinates: LatLng;
    title: string;
    description: string;
}