---
id: quick_tutorial
title: Quick Tutorial
---

Kunyora provides a way for you to carry out restful request in an highly declarative manner. This provides one with the ability to write highly structured codes without plumbing lots of data with the User Interface. The library build on the popular axios library since `axios` provides one with more strcutured methods for interacting with a restful backend. However the vision of this library is not just to act as a request inititator and handler with a restful backend but to act as a client library whose main purpose would be to focus on making web apps faster by using some data manipulation techniques. More of this can be seen in the [vision](vision.md) section of this page.

However, in this section we shall be building an hello world application. Let's do this.

# Hello World

This tutorial would be focused on its integration with ReactJs which is the only client side library that the app is currently integrated with.

## Create a client

Great, now we would assume that we have successfully installed the client library using npm or yarn. Let's go ahead to initialize our client based code.

`Index.js` file, let's import `KunyoraClient` from `kunyora` and add `baseURL` and the `nouns` property to it. The `baseURL` property should contain your restful api URL while the `nouns` is an array containing an Object which specifies the `path` and an optional `name` to use with the particular path. In our case, the full url for this request becomes `http://localhost:3000/api/v1/admin/greeting` which can be queried using `getGreeting` (get acting as a resource appender created by KunyoraClient and Greeting being what you supplied as the name; but camelcased with the appender). Please refer to the [Kunyora docs](kunyora_tutorial.md) for a more detailed explanation.

```javascript
/**
 * Index.js
 */

import KunyoraClient from "kunyora";

const client = KunyoraClient({
  baseURL: "http://localhost:3000/api/v1",
  nouns: [{ path: "admin/greeting", name: "greeting" }]
});
```

## Connect your client to React

Lets's advance further and connect the client to React. To do this, you will need to use `KunyoraProvider` which is exported from `react-kunyora`. The `KunyoraProvider` component is a top level component that wraps our entire application and provides it with the `client` and the `store` instance as contextes.

`KunyoraProvider` uses the new context API from reactJs to expose this instances to the entire application. Also, it is always advisable to wrap your entire application within the `KunyoraProvider` top-level component. In our `index.js` file, let's make this import and wrap our entire application with `KunyoraProvider`. Make sure you pass a props tagged `client` which contains the client instance created from initializing `KunyoraClient` and the `store` props which contains the store exposed by `KunyoraClient`

```javascript
/**
 * Index.js
 */
import React from "react";
import { render } from "react-dom";

import { KunyoraProvider } from "react-kunyora";
import HelloKunyora from "./HelloKunyora";

const App = () => (
  <KunyoraProvider client={client} store={client.store}>
    <div>
      <HelloKunyora />
    </div>
  </KunyoraProvider>
);

render(App, document.getElementById("app"));
```

## Request data

Finally, let's connect our `HelloKunyora` component to data from our restful backend. To do this, we need to make use of the `Query` component which is exposed from `react-kunyora` and pass it some props which it uses to carry out this request. The `Query` component makes use of `render props pattern` to share the restful data with you UI.

First, we need to pass an `operation` prop to the component. The `operation` prop tells `kunyora` to carry out a task based on the component used. A `Query` component can only carry out a `get` request, and since we specified a `noun` property containing a `greeting` name in one of the objects in the client instance created above, we expose `kunyora` to a `getGreeting` method. More explanations of this can be found in the [Kunyora docs](kunyora_tutorial.md).

In response to the request made, `react-kunyora` passes `queryResult, fetchMore, and refetchQuery` to the `Query` component's children. `queryResult` is an object containing `error, data, loading, isInitialDataSet` state keys. `fetchMore and refetchQuery` are typically used in fetching more results and refetching a query respectively. Please refer to the [Query](query_component.md) docs for a more detailed explanation.

```javascript
/**
 * HelloKunyora.js
 */

import React from "react";
import { Query } from "react-kunyora";

export default (HelloKunyora = props => (
  <Query operation="getGreeting">
    {(queryResult, fetchMore, refetchQuery) => <div>{queryResult}</div>}
  </Query>
));
```

Congrats, you just succeeded in creating your first `react-kunyora and kunyora` application. You should be excited by now by the amount of declarative code we wrote to get this to work efficiently. Its time we get you into the deep bindings of the `Query` component, Please refer to the [Query docs](query_component.md) for a more detailed explanation.
