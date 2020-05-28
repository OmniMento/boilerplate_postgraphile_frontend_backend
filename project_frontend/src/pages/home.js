import React from 'react';
import { List } from 'antd';
import { Redirect } from 'react-router-dom'

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const QUERY = gql`
    query QUERY {
        query {
            nodes {
                id
                name
                stuff {
                    name
                }
                things {
                    name
                    otherthings {
                        name
                    }
                }
            }
        }
    }
  `;

export default function Home() {

    const { loading, error, data } = useQuery(QUERY);
    console.log(data)
    if (!data) return null;

    const queryData = data.query.nodes

    return (
        <>
            <List
                header={<h1>Boilerpate</h1>}
                bordered
                dataSource={queryData}
                renderItem={item =>
                    <List.Item
                        key={item.id}
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={
                                `${item.stuff.name}
                                ${item.things.otherthings.name}`
                            }
                        />
                    </List.Item>
                }
            />
        </>
    )
}