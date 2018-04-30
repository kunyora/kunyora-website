---
id: quick_tutorial
title: Quick Tutorial
---

With Kunyora, your applications can carry out restful operations in an highly disposable manner. This means you can build highly structured UI's that can easily be disposed at any time reducing the common code smell problem we face in building UI's. The library builds on the popular axios library since `axios` provides one with more structured methods for interacting with a restful backend. However the vision of this library is not just to act as a request inititator and handler but to act as a client library whose main purpose would be to reduce the network-response time by imploring some data manipulation techniques. More on this can be seen in the [vision](vision.md) section of this documentation.

However, in this section we will be building an hello kunyora application with react-kunyora. Tutorials for other view binders such as VueJs and AngularJs will be available soon. Let's do this.

# Hello World

This tutorial would be focused on its integration with ReactJs which is the only client side library that kunyora is currently integrated with.

## Create a client

Great, now we would assume that you have successfully installed the client library using npm or yarn. Let's go ahead to initialize our client based code.


```javascript
/**
 * Index.js
 */

import KunyoraClient from "kunyora";

const client = KunyoraClient({
  baseURL: "https://kunyora.herokuapp.com/",
  nouns: [{ path: "admin/greeting", name: "greeting" }]
});
```

In the `Index.js` file, we import `KunyoraClient` from `kunyora` and add `baseURL` and the `nouns` property to the KunyoraClient configuration option. The `baseURL` property contains our restful api URL while the `nouns` is an array containing an Object which specifies the `path` and an optional `name` to use with the particular path. In the above sample code, the full url for this request becomes `https://kunyora.herokuapp.com/admin/greeting` which can be queried using `getGreeting` (`get` acting as a resource operation created by KunyoraClient and `greeting` being what we supplied as the name; but camelcased with the operator). Please refer to the [Introduction to operation Docs](introduction_to_operations.md) for a more detailed explanation on how operations are formed and used.

## Connect your client to React

```javascript
/**
 * Index.js
 */
import React from "react";
import { render } from "react-dom";

import { KunyoraProvider } from "react-kunyora";
import HelloKunyora from "./HelloKunyora";
import registerServiceWorker from "./registerServiceWorker";

const App = () => (
  <KunyoraProvider client={client} store={client.store}>
    <div>
      <HelloKunyora />
    </div>
  </KunyoraProvider>
);

render(<App />, document.getElementById("root"));
registerServiceWorker();
```

The above code sample advances further and connects the client to React. To do this, we needed to use `KunyoraProvider` which is exported from `react-kunyora`. The `KunyoraProvider` component is a top level component that wraps our entire application and provides it with the `client` and the `store` instance as contextes.

`KunyoraProvider` uses the new context API from reactJs to expose this instances to the entire application. Also, it is always advisable to wrap your entire application within the `KunyoraProvider` top-level component. We also made sure that we passed the `client` prop which contains the client instance created from initializing `KunyoraClient` and the `store` prop which contains the store exposed by `KunyoraClient`.

## Request data

```javascript
/**
 * HelloKunyora.js
 */

import React from "react";
import { Query } from "react-kunyora";

const HelloKunyora = props => (
  <Query operation="getGreeting">
    {(queryResult, fetchMore, refetchQuery) => <div>{queryResult.data}</div>}
  </Query>
);

export default HelloKunyora;
```

Finally, we connect our `HelloKunyora` component to data from our restful backend. To do this, we needed to make use of the `Query` component which is exposed from `react-kunyora`. The `Query` component makes use of the `render props pattern` to share the restful data with our UI.

First, we needed to pass an `operation` prop to the component. The `operation` prop tells `kunyora` to carry out a task. A `Query` component can only carry out a `get` request, and since we specified a `noun` property containing a `greeting` name in one of the objects in the client instance created above, we expose `kunyora` to a `getGreeting` method. More explanations on this can be found in the [Kunyora docs](kunyora_tutorial.md).

In response to the request made, `react-kunyora` passes `queryResult, fetchMore, and refetchQuery` to the `Query` component's children. `queryResult` is an object containing `error, data, loading, isInitialDataSet` state keys. `fetchMore and refetchQuery` are typically used in fetching more results and refetching a query respectively. Please refer to the [Query](query_component.md) docs for a more detailed explanation.


Congrats, you just succeeded in creating your first react-kunyora and kunyora application. You should be excited by now by the amount of declarative code we wrote to get this to work efficiently. Its time we get you into the deep bindings of [how operations are formed and used](introduction_to_operations.md). It's going to be fun practicing.  