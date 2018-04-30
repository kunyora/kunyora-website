---
id: connector_component_api_overview
title: Connector Api Overview
---

The Connector component is a component which you can use to connect your `views` to a progress route. This component is not compartible with mobile for now and should only be used on the web.

# Props

* [`name`](connector_component_api_overview.md#name)
* [`loader`](connector_component_api_overview.md#loader)
* [`loadingComponent`](connector_component_api_overview.md#loadingcomponent)
* [`errorComponent`](connector_component_api_overview.md#errorcomponent)
* [`delay`](connector_component_api_overview.md#delay)
* [`timeout`](connector_component_api_overview.md#timeout)

* [`Parameters passed to this.props.children`](connector_component_api_overview.md#parameters-passed-to-thispropschildren)

# Refernece

## Props

### `name`

specifies the unique name for your application.
| Type | Required |
| --- | --- |
| string | Yes |

### `loader`

```javascript
<Connector loader={() => import("./COMPONENT_TO_DYNAMICALLY_IMPORT")}>
  {Component => <Component />}
</Connector>
```

This component is used to dynamically import the component. It returns a promise. If this is not supplied or it is undefined, then code splitting is not done.

| Type | Required | Return Type |
| ---- | -------- | ----------- |
| func | No       | Promise     |

### `loadingComponent`

specifies a component which should be used to indicate that the dynamic component is currently loading

| Type                  | Required |
| --------------------- | -------- |
| enum(func, component) | No       |

### `errorComponent`

specifies a component which should be used to indicate that the dynamic component failed to load

| Type                  | Required |
| --------------------- | -------- |
| enum(func, component) | No       |

### `delay`

specifies the amount of milliseconds it should take for a loading component to be rendered initially when the component is being downloaded. This solves the issue of a screen flicker on a fast network.

| Type   | Required |
| ------ | -------- |
| Number | No       |

### `timeout`

specifies the time it would take to forcefully stop downloading the component on a slow network connection.

| Type   | Required |
| ------ | -------- |
| Number | No       |

# Parameters passed to this.props.children

```javascript
<Connector name="invitation" loader={() => import("./Invitation")}>
  {(Component, { progressCount }) => {
    let _props = { progressCount };
    return <Component {..._props} />;
  }}
</Connector>
```

Only two parameters are passed to the children prop of the `Connector` component. The first is the dynamically loaded `Component` while the second is an Object of the `progresssCount`.

| Name          | Type          | Description                                                                      |
| ------------- | ------------- | -------------------------------------------------------------------------------- |
| Component     | React.Component | This is the dynamically loaded component                                         |
| progressCount | number        | This is a progress count from the handshake initialized from the preceeding page |
