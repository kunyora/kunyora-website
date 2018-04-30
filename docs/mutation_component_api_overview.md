---
id: mutation_component_api_overview
title: Mutation Api Overview
---

The `Mutation` component is a simple reactJs `render prop` element, which you can use in making typical `post, put, delete, patch` requests. This section of the documentation is divided into 2 sections, the `Props` used by the component and the `Parameters passed to this.props.children` of the component.

# Props

* [operation](mutation_component_api_overview.md#operation)
* [options](mutation_component_api_overview.md#options)

# Parameters passed to this.props.children

* [mutationState](mutation_component_api_overview.md#mutationstate)
* [mutate](mutation_component_api_overview.md#mutate)

# Reference

### `operation`

specifies the operations that should be used to query your api. Operations are formed from camel-casing `create, update, delete, partUpdate` and the `name` supplied in the `nouns` of a query. Please refer to the [Introduction to operation](introduction_to_operation.md) section of the docs to see how operations are generally formed.

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `options`

```javascript
<Mutation
  options={{
    config: {...axiosConfiguration},
    refetchQueries: [
      {
        operation: 'SPECIFY_YOUR_OPERATION',
        config: {...axiosConfiguration},
      },
    ],
  }}>
  {(mutationstate) => <div />}
</Mutation>
```

specifies an object that contains the `config` and the `refetchQueries` properties which is used to send a default configuration for that particular mutation request and refetch queries automatically after a mutation must have been carried out.

| Type   | Required |
| ------ | -------- |
| Object | No       |

**options.config** The configuration specified here is similar to that passed to the client instance. Please refer to the axios documentation for a full insight into the keys exposed by this property [axios](https://github.com/axios/axios/blob/master/README.md). This property is however not `required` when instantiating a request.

**options.refetchQueries**

This can be used to refetch queries automatically when a mutation has been carried out. It is an `array` containing `objects` which it uses to fetch query update after the mutation has been performed successfully.

| Type                   | Required |
| ---------------------- | -------- |
| Array[`Object.config`] | No       |

**Object.configs of refetchQueries** This are the Object that the `Mutation` component calls after a mutation has been performed.

| Name      | Type   | Required | Description                                                                                                                                                                                                                                                                                                    |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| operation | string | Yes      | specifies the `operation` that should be used in making the `get` request. Please refer to the [Introduction to operation](introduction_to_operation.md) section to know how operations are formed and used                                                                                                    |
| config    | Object | No       | specifies the config to send with the query which is to be sent. It is similar to the configuration passed to the `axios` instance, so please refer to [axios](https://github.com/axios/axios/blob/master/README.md) documentation for a full insight into the properties that can be specified in this object |

## Parameters passed to this.props.children

```javascript
<Mutation operation="createTodo">{(mutationState, mutate) => <div />}</Mutation>
```

### `mutationState`

This is an object which contains the information that specifies the state of the mutation. It contains only a single property which is the `loading` property of the application.

**Object properties of mutationState** |Name | Type | Description | | -- | -- | -- | | loading | bool | specifies the loading state of the mutation|

### `mutate`

This is a function that mutate the api. This function takes a single argument which is the config it sends along while making the mutation. The config specified in the `mutate` function is similar to that specified in the `axios` instance. Please check the [axios](https://github.com/axios/axios/blob/master/README.md) for an insight into the keys that can be specified in this object.
