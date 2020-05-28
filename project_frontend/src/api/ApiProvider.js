import React from 'react';
import { notification } from 'antd';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import DebounceLink from 'apollo-link-debounce';

const client = new ApolloClient({
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all'
        }
    },
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                for (let { message, locations, path } of graphQLErrors) {
                    notification.error({
                        message
                    })
                    console.error(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    )
                }
            if (networkError) console.error(`[Network error]: ${networkError}`);
        }),
        new DebounceLink(250),
        new HttpLink({
            uri: `${process.env.BACKEND_URL}/graphql`,
            // credentials: 'include'
        })
    ]),
    cache: new InMemoryCache({
        dataIdFromObject: object => object.nodeId || null
    })
});

export function ApiProvider({ children }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}
