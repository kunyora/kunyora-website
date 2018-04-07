---
id: quick_tutorial
title: Quick Tutorial
---

<style>
  .highlight {
    color: #37474f;
  }
</style>

Lasa Client provides a way for you to carry out restful request in an highly declarative manner. This provides one with the ability to write highly structured codes without plumbing lots of data with the User Interface. The library build on the popular axios library since `axios` provides one with more strcutured methods for interacting with a restful backend. However the vision of this library is not just to act as a request inititator and handler with a restful backend but to act as a client library whose main purpose would be to focus on making web apps faster by using some data manipulation techniques. More of this can be seen in the [vision](vision.html) section of this page.

However, in this section we shall be building an hello world application. Let's do this.

# Hello World

This tutorial would be focused on its integration with ReactJs which is the only client side library that the app is currently integrated with.

## Create a client

Great, now we would assume that we have successfully installed the client library using npm or yarn. Let's go ahead to initialize our client based code.

`Index.js` file, let's import `LasaClient`</span> from `lasa-client` and add `baseURL` and the `nouns` property to it. The `baseURL` property should contain your restful api URL while the `nouns` is an array containing an Object which specifies the `path` and an optional `name` to use with the particular path. In our case, the full url for this request becomes `http://localhost:3000/api/v1/admin/greeting` which can be queried using `getGreeting` (get acting as a resource appender created by LasaClient and Greeting being what you supplied as the name; but camelcased with the appender). Please refer to the [LasaClient docs]("lasa_client.html") for a more detailed explanation.

```javascript
/**
 * Index.js
 */

import LasaClient from "lasa-client";

const client = LasaClient({
  baseURL: "http://localhost:3000/api/v1",
  nouns: [{ path: "admin/greeting", name: "greeting" }]
});
```

## Connect your client to React

Lets's advance further and connect the client to React. To do this, you will need to use `LasaProvider` which is exported from `react-lasa`. The `LasaProvider` component is a top level component that wraps our entire application and provides it with the `client` and the `store` instance as contextes.

`LasaProvider` uses the new context API from reactJs to expose this instances to the entire application. Also, it is always advisable to wrap your entire application within the `LasaProvider` top-level component. In our `index.js` file, let's make this import and wrap our entire application with `LasaProvider`. Make sure you pass a props tagged `client` which contains the client instance created from initializing `LasaClient` and the `store` props which contains the store exposed by `LasaClient`

```javascript
/**
 * Index.js
 */
import React from "react";
import { render } from "react-dom";

import { LasaProvider } from "react-lasa";
import HelloLasa from "./HelloLasa";

const App = () => (
  <LasaProvider client={client} store={client.store}>
    <div>
      <HelloLasa />
    </div>
  </LasaProvider>
);

render(App, document.getElementById("app"));
```

## Request data

Finally, let's connect our `HelloLasa` component to data from our restful backend. To do this, we need to make use of the `Query` component which is exposed from `react-lasa` and pass it some props which it uses to carry out this request. The `Query` component makes use of `render props pattern` to share the restful data with you UI.

First, we need to pass an `operation` prop to the component. The `operation` prop tells `lasa-client` to carry out a task based on the component used. A `Query` component can only carry out a `get` request, and since we specified a `noun` property containing a `greeting` name in one of the objects in the client instance created above, we expose `lasa-client` to a `getGreeting` method. More explanations of this can be found in the [LasaClient docs]("lasa_client.html").

In response to the request made, `react-lasa` passes `queryResult, fetchMore, and refetchQuery` to the `Query` component's children. `queryResult` is an object containing `error, data, loading, isInitialDataSet` state keys. `fetchMore and refetchQuery` are typically used in fetching more results and refetching a query respectively. Please refer to the [Query]("react_query.html") docs for a more detailed explanation.

```javascript
/**
 * HelloLasa.js
 */

import React from "react";
import { Query } from "react-lasa";

export default (HelloLasa = props => (
  <Query operation="getGreeting">
    {(queryResult, fetchMore, refetchQuery) => <div>{queryResult}</div>}
  </Query>
));
```

Congrats, you just succeeded in creating your first `react-lasa and lasa-client` application. You should be excited by now by the amount of declarative code we wrote to get this to work efficiently. Its time we get you into the deep bindings of the `Query` component, Please refer to the [Query docs]("react_query.html") for a more detailed explanation.
