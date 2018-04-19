---
id: query_component
title: Query Component
---

A Query component is a lower level component which you would typically use in making **only** `get reqeusts`, hence the component name `Query`. Queries are typically operations performed on a database which do not mutate(to cause a change) the database. The Query component is a component exported from `react-kunyora` which you could use to connect your UI to datas sent by your api. It is also a declarative API which allows you to perform queries while handling states like loading and error in a declarative manner.

In this section of the documentation, we would be creating a very `simple notification list application`, so sit tight and get your hands ready to practice some query codes.

* [`Creating a Notification List Application`](query_component.md#creating-a-notification-list-application)
* [`Creating the client`](query_component.md#creating-the-client)
* [`Connecting to our data using the Query component`](query_component.md#connecting-to-our-data-using-the-query-component)

## Creating a Notification List Application

In this section of the Query tutorial, we would be creating a simple notification listing application which would query our online API to get a list of notification, it would then render the results of this notification in a list. The List would be able to refetch its queries in case there is an error in the network. We shall also provide detailed explanation of the `Query props` in action.

### **Creating the client**

Let's go ahead to create the client of our application. We would assume that you are familiar with creating the a client already and therefore we would explain other details that you should be aware of when using our library with `reactJs`. However, if you do not have enough knowledge about creating a `client`, then check our [`indepth tutorial docs`](kunyora_tutorial.md) and the [Kunyora Api Reference Configuration section](kunyora_api_reference.md#client-configration).

```javascript
/**
 * Index.js
 */
import React from "react";
import { render } from "react-dom";
import KunyoraClient from "kunyora";
import { KunyoraProvider } from "react-kunyora";
import registerServiceWorker from "./registerServiceWorker";

import NotificationList from "./NotificationList";

const client = KunyoraClient({
  baseURL: "https://test-kunyora.herokuapp.com",
  nouns: [{ path: "notification", name: "notification" }]
});

const App = () => (
  <KunyoraProvider client={client} store={client.store}>
    <div>
      <NotificationList />
    </div>
  </KunyoraProvider>
);

render(<App />, document.getElementById("app"));
registerServiceWorker();
```

The `client` above is created using just the `baseURL` and the `nouns` of the `config`. When using a view layer like `reactJs`, there is no need to specify the `thenables` and `catchables` properties in your config as `react-kunyora` automatically handles that for you internally and just feeds your UI with the result sent by the restful Api.
Also we created a test url for this application on heroku which we specified in our `baseURL` property. We would also be connecting to the `/notification` routes. Then we go ahead to connect our whole application to a top level [KunyoraProvider](kunyora_provider_component.md) component while passing in the `client` instance and the `store` as props.

### **Connecting to our data using the Query component**

Lets connect our UI to the data from the store using a query component. We would cover all the possible scenarios of using the `Query` component here including a render loading and error component and refetching queries.

```javascript
/**
 * NotificationList.js
 */

import React from "react";
import { Query } from "react-kunyora";

export default (NotificationList = props => (
  <Query
    operation="getNotification"
    renderError={<p>An error just occurred</p>}
    renderLoading={<p> Loading... </p>}
    options={{ fetchPolicy: "network-only" }}
  >
    {(notifications, fetchMore, refetchQuery) => [
      <div key={0}>
        {notifications.data.map((notification, i) => (
          <li key={i}>{notification.name}</li>
        ))}
      </div>,
      <button key={1} onClick={() => refetchQuery()}>
        Refresh List
      </button>
    ]}
  </Query>
));
```

Notice that the above code uses `react fragment api` to render 2 children components in the `Query` component. The code above queries for a list of notification which it displays in a list and then renders a button that can be used to refetch the query. Lets go ahead to explain the props used in this example.

* **operation** : This props is used to specify the command to run. Typically in a `get` request, it is formed by camel-casing `get` with the `name` or `path` attribute supplied by the user when creating the `client` and in our case, this is `notification`. For a full understanding of how `accessors` are formed, please refer to the [Indepth tutorial](query_component.md) section of the application for a more detailed explanation of this.

* **renderError** : This props is used to render a view in case an error occurred while fetching the query. In our case, we render a text which notifies a user that an error just occured.

* **renderLoading** : This props is used to render a view when the query is in flight.In our case, we render a text `loading...`.

* **options** : This props helps us to specify the configuration of the application. It accepts an object containing 2 properties; `fetchPolicy` and `config`. `fetchPolicy` can be used to specify a fetching pattern that our application should use while `config` generally specifies the configuration particular to just the query being sent. In the `config` property, we can specify `get parameters` that the application should use along with some other custom parameters. In our case, we specify a `network-only` fetchPolicy. Please refer to the [API reference](query_component_api_overview.md) of this docs.

Now, lets go ahead to explain the parameters passed to our `this.props.children` of the `Query` component.

* **notifications** : This is an object which contains the `error`, `loading` and the `data` entities for our query. The `error` and `loading` value of the `Query` component are passed in case you choose to handle error and loading manually yourself within the application instead of using the `renderError` and the `renderLoading` props. `notifications.data` on the other hand, contains the data which has been sent back by your api probably in .json format. In our case, the `notification.data` contains the list of notifications stored in our online database.

* **fetchMore** : This is a function used to fetch more results

* **refetchQuery** : This is a function used to refetch a query

The `Query` component also uses a lot of other props such as the `skip` props to skip queries, and the `notification.data` property also contains an `isInitialDataSet` boolean field which can tell your application if an initial data has been loaded before by the query or not.

Please refer to the [Query Api Overview](query_component_api_overview.md) section of this docs for more details on the `Query` component.
