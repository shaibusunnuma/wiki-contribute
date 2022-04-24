import {
    ApolloClient,
    InMemoryCache,
    from,
    HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry"

const httpLink = new HttpLink({ uri: "http://10.225.4.112:3000/graphql" });

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
    },
    attempts: {
        max: 5,
        retryIf: (error, _operation) => !!error,
    },
});

export default new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, retryLink, httpLink]),
});