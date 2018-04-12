---
id: router_component_api_overview
title: Router Api Overview
---

The `Router` component is a simple reactJs `render props` component, which you can use in prefetching some contents and a route before navigating to the actual route. This component is not compartible with mobile for now and should only be used on the web.

# Props

* [`name`](router_component_api_overview.md#name)
* [`loader`](router_component_api_overview.md#loader)
* [`resources`](router_component_api_overview.md#resources)
* [`onRequestRoute`](router_component_api_overview.md#onrequestroute)

* [`Parametrs passed to this.props.children`](router_component_api_overview.md#parameters-passed-to-thispropschildren)

# Reference

## Props

### `name`

specifies the unique name for your application. If you are code splitting your app on the `route` level, then make sure the name specified here is the same as the one specifed in the `Connector` component.

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `loader`

```javascript
<Router loader={() => import("./COMPONENT_TO_DYNAMICALLY_IMPORT")}>
  {() => <SomeComponent />}
</Router>
```

This component is used to dynamically import the component. It returns a promise. If this is not supplied or it is undefined, then code splitting is not done.

| Type | Required | Return Type |
| ---- | -------- | ----------- |
| func | No       | Promise     |

### `Resources`

```javascript
<Router
  resources={[
    {
      operation: "YOUR_ACCESOR",
      config: { ...someConfig },
      fetchPolicy: "cache-and-network"
    }
  ]}
>
  {() => <SomeComponent />}
</Router>
```

This prop can be use to specify an array of queries to prefetch before routing the user to the next screen.

**options**
| Name | Type | Required | Description |
| -- | -- | -- | -- |
| operation | string | Yes | This is the accessor that is used to fetch the data. Please refer to the [Kunyora tutorial](kunyora_tutorial.md) for a brief of how this is formed |
| config | Object | No | this is similar to the axios config supplied to its instance. This is sent with the request. Please refer to the [axios](axios.com) docs |
| fetchPolicy | enum("cache-only", "network-only", "cache-and-network", "cache-first") | "cache-first" ) | No (defaults to ("cache-first")) | specify the fetch type for the query |

### `onRequestRoute`

```javascript
<Router onRequestRoute={() => this.props.history.push("/screen")}>
  {() => <SomeComponent />}
</Router>
```

is called after successfully downloading the `Component` and the `queries` needed for the request view. This code should be a function returning a code which performs the route using any routing library of your choice

| Type | Required |
| ---- | -------- |
| func | Yes      |

# Parameters passed to this.props.children

```javascript
<Router name="invitation" loader={() => import("./Invitation")}>
  {({ error }, routeProgress, push) => (
    <button onClick={push}> Navigate </button>
  )}
</Router>
```

This parameters can be used within your app to carry out some functionalities.

| Name          | Type   | Description                                                                                                          |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| error         | any    | specifies any error that occurred from making the handshake                                                          |
| routeProgress | Number | specifies a progress of the download which you could pass to a progress bar to notify the user of the route progress |
| push          | func   | should be passed to a component which would start the handskake and prefetch the request                             |
