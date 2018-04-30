---
id: query_component_api_overview
title: Query Api Overview
---

The `Query` component is a simple reactJs `render prop` element, which you can use in making typical `get query requests` to your restful api. This section of the documentation is divided into 2 sections, the `Props` used by the component and the `Parameters passed to this.props.children` of the component.

This component uses an `heuristic` approach in mapping queries made to the store. A query is mapped using its configuration. Please refer to the [router docs](router_component_api_overview.md) for more information on this.

# Props

* [skip](query_component_api_overview.md#skip)
* [operation](query_component_api_overview.md#operation)
* [renderError](query_component_api_overview.md#rendererror)
* [renderLoading](query_component_api_overview.md#renderloading)
* [options](query_component_api_overview.md#options)

# Parameters passed to this.props.children

* [queryResult](query_component_api_overview.md#queryresult)
* [fetchMore](query_component_api_overview.md#fetchmore)
* [refetchQuery](query_component_api_overview.md#refetchquery)

# Reference

## Props

### `skip`

determines if a query should be skipped or not.

| Type | Required |
| ---- | -------- |
| bool | No       |

### `operation`

specifies the operation that should be used to query your api. Operations are formed from camel-casing `get` and the `name` supplied in the `nouns` of a query. Please refer to the [Introduction to operation](introduction_to_operation.md) section of the docs to see how operations are generally formed.

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `renderLoading`

specifies a component which should be used to indicate that a query is in flight

| Type      | Required |
| --------- | -------- |
| component | No       |

### `renderError`

specifies a component which should be used to indicate that a query has failed

| Type      | Required |
| --------- | -------- |
| component | No       |

### `options`

```javascript
<Query
  options={{
    fetchPolicy: "SPECIFY_YOUR_FETCH_TYPE",
    config: { ...axiosConfiguration }
  }}
>
  {queryResult => <div />}
</Query>
```

specifies an object that contains the `fetchPolicy` and the `config` properties which is used to specify the fetch type for the query and additional configuration to send with the query respectively.

| Type | Required |
| ---- | -------- |
| func | No       |

**options.fetchPolicy**
| Type | Default | Required |
| ---- | -------- | ------- |
| enum("cache-only", "network-only", "cache-and-network", "cache-first") | "cache-first" | No |

**options.config**
The configuration specified here is similar to that passed to the client instance. Please refer to the [axios](https://github.com/axios/axios/blob/master/README.md) documentation for a full insight into the keys exposed by this property. This property is however not `required` when instantiating a request.

## Parameters passed to this.props.children

```javascript
<Query operation="getNotification">
  {(queryResult, fetchMore, refetchQuery) => <div />}
</Query>
```

### `queryResult`

This is an object which contains the informations that specifies the state of the data being requested for. It contains the `loading` property which specifies that a request is in flight or not, an `error` property which specifies that the query has failed, a `isInitialDataSet` property which specifies that the initial data for the query has been added to the store and the `data` property which specifies the data sent by the Api.

**Object properties of queryResult**
| Name | Type | Description |
|------ | ---- | ------ |
|loading | bool | specifies that a request is in flight or not |
| error | any | specifies that the query has failed |
| data | any | specifies the data sent by the Api |

### `fetchMore`

```javascript
fetchMore({
  config: { ...axiosConfiguration },
  updateQuery: function(previousResult, { fetchMoreResult }) {
    return [...fetchMoreResult, previosResult];
  }
});
```

This is a function that should be used to fetch more queries from the Api. This function is ideal when one wants to fetch more contents like for instance in a list that has a fetch more functionality. `updateQuery` must be specified when `fetchMore` is called and a new `Object` must be returned which would be used to update the state internally. `updateQuery` can use the `previousResult` and the `fetchMoreResult` parameters to form a new Object which would update the state.

`config` is similar to that used by `axios`, so please refer to the [axios](https://github.com/axios/axios/blob/master/README.md) documentation for an insight into what parameters can be supplied.

**parameters used with updateQuery**

| Name            | Type | Description                                           |
| --------------- | ---- | ----------------------------------------------------- |
| previousResult  | any  | This contains the previous data returned by the query |
| fetchMoreResult | any  | This contains the new response gotten by the api        |

### `refetchQuery`

```javascript
refetchQuery({ ...config });
```

This is a function which can be used to refetch a query. The `config` object can be specified here and if it is not specified here, then the `Query`component defaults to using the initial configuration specified by the query. The `config` object is similar to that passed to the axios instance, so please refer to the [axios](https://github.com/axios/axios/blob/master/README.md) documentation for a full insight into the properties that can be used in the config object.

| Name         | Type     |
| ------------ | -------- |
| refetchQuery | function |
