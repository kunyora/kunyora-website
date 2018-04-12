---
id: router_component
title: Router Component
---

The Router component is one which helps in initializing a request handshake between 2 pages or screens. It is a low level api built using the common `render props` reactJs pattern. This low level component does not work on mobile i.e `react-native` or any other Javascript based mobile native library except hybrid based i.e `Cordova`. This component is quite useful when you are building a web app that requires a `screen` to download some contents before pushing the user to the next route. The `Router`component is conceptually used in this scenario to instantiate the download the contents before the Push.

Also, the push can be implemented irrespective of the routing library being used. with the `Router` component, one could specify that screens should download both the `Component` and fetch the `queries` which would be displayed on the next screen before actually performing the route.
Therefore, in this tutorial, we would be building a very small application which would show the `Router` component in action. Let's swing into action to se how this is done.

* [`Building a simple page navigator`](router_component.md#building-a-simple-page-navigator)
* [`Setting up the routes`](router_component.md#setting-up-the-routes)
* [`Prefetching Data`](router_component.md#prefetching-data)
* [`Rendering Data`](router_component.md#rendering-data)

## Building a simple page navigator

In this section, we would be building a very simple page navigator. Our page navigator would consist of 2 screens. The first containing a button which when clicked routes a user to the next screen containing a list of **prefetched** notifications. In this tutorial, we would be using `react-router v4` as our routing library. So Let's go ahead to set up our application from scratch.

## Setting up the routes

In this section, we would setting up the routes for our navigator based application. As stated earlier, we would be making use of `react-router v4` as our routing library. We would assume that you are quite familiar with `react-router` and therefore skip all the details in explaining the library itself. Please refer to the [react-router](reactRouter.com) site if you are not familiar with using the library.

```javascript
/**
 * Index.js
 */
import React from "react";
import { render } from "react-dom";
import KunyoraClient from "kunyora";
import { KunyoraProvider } from "react-kunyora";

import AppRoutes from "./AppRoutes";

const client = KunyoraClient({
  baseURL: "https://www.test-kunyora.herokuapp.com",
  nouns: [{ path: "/notification", name: "notification" }]
});

const App = props => (
  <KunyoraProvider client={client} store={client.store}>
    <AppRoutes />
  </KunyoraProvider>
);
```

In the code above, we set up the client of the application using the `KunyoraProvider` top level component and `KunyoraClient`, please refer to the [KunyoraProvider Docs](kunyora_provider_component.md) to learn about this component and the [`Kunyora Docs`](kunyora_tutorial.md) for more reference.

```javascript
/**
 *  AppRoutes.js
 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Initiator from "./Initiator";
import Notification from "./Notification";

export default (AppRoutes = props => (
  <Router>
    <Switch>
      <Route path="/" component={Initiator} />
      <Route path="/notification" component={Notification} />
    </Switch>
  </Router>
));
```

In the code above, we setup our routes.

## Prefetching Data

Let's create the `Initiator` screen of our application. This screen would be used in initializing the request using the `Router` component.

```javascript
/**
 * Initiator.js
 */
import React from "react";
import { Router } from "react-kunyora";

export default (Initiator = props => (
  <Router
    name="Notification"
    loader={() => import("./Notification")}
    resources={[{ operation: "getNotification" }]}
    onRequestRoute={() => props.history.push("/notification")}
  >
    {(routeState, fetchProgress, push) => (
      <button onClick={push}>View Notifications</button>
    )}
  </Router>
));
```

In the above, we supply a name for our route which is required. If you are code splitting from the route level, then make sure that the `Connector` and the `Router` both have the same name. The `loader` prop is used to prefetch that route before initial route, the `resource` prop is used to specify a list of queries to prefetch before routing the user to the next screen. The `onRequestRoute` prop should be used to specify a function which would be called when the contents have been downloaded. In our case, we use `react-router` to oute the user to the next screen.

The parameter specified in the children props of the `Router` component should be used within it to carry out its functionalities. In this case, we pass the `push` parameter to the buttons `onClick` event.

## Rendering Data

Here, we would create the `Notification` component which would be used in displaying the notification. We would not go into details in explaining the `Query` component, we assume that you are familiar with it, however you can check up the [Query Tutorial](query_component.md) for more reference.

```javascript
/**
 * Notification.js
 */
import React from "react";
import { Query } from "react-kunyora";

export default (Notification = props => (
  <Query operation="getNotification">
    {notifications => (
      <ul>
        {notifications.map((notification, i) => (
          <li key={i}>{notification}</li>
        ))}
      </ul>
    )}
  </Query>
));
```

Ideally, we are suppose to code split at the route level within the `Notification` component using the `Connector` component. However, you can check up our series of tutorials for an example of how to achieve this purpose.

Run your application and see the beauty in using the `react-kunyora`. Please check out the [Router Api reference](router_component_api_overview.md) for an overview of ythe component.
