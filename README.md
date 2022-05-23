# WikiContribute
A light-weight context-aware mobile application for browsing and editing Wikidata.
## How to run the application locally
### Running Front End:
1. Install expo with `npm i -g expo-cli`.
2. Navigate to [front_end](./front_end) and run `yarn install`.
3. Run `expo start` to run the application locally.
4. You can run the application on your device by scanning the qr code with the expo app.

### Running Back end:
1. Navigate to [server](./server).
2. Run `yarn run devStart`.

### Connecting Front End and Backend:
Navigate to [`Config.ts`](./front_end/GraphQL/Config.ts) and change `graphqlEndpoint` to your local endpoint.

## Demo



https://user-images.githubusercontent.com/69070520/169910240-dc63b711-2ecf-4297-895f-51a493936269.mov

