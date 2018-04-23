---
id: version-0.1.0-connector_component
title: Connector Component
original_id: connector_component
---

A `Connector` component is a low level component which is used to connect a `screen` or `view` or `page` to the progress of the route being sent from navigating to that particular page. It works similarly to `npmJs` or `youtube's` way of connecting a page to the information of the route from the request being made by a previous page. This low level component does not work on mobile i.e `react-native` or any other Javascript based mobile native library except hybrid based i.e `Cordova`. This component is quite useful when you are building a web app that requires a `screen` to download some contents before pushing the user to the next route.

Lets consider this short illustration, Let's consider two pages `Page A` and `Page B`, when a button in `Page A` is clicked, it needs to make a request to prefetch some queries from an online Api before navigating the `Page B`. Also it needs to display a loading progress bar at the top of the page while making this navigation. Ideally, we would want to initialize an handshake between `Page A` and `Page B` which allow `Page A` to specify that it wants to navigate to `Page B`, then give `Page B` the functionality to show a progress bar after the handshake and navigation.

Therefore, to implement this successfully, we would need 2 major components. The `Router` which we would use in initializing the request, show some progress and downloading the contents , and the `Connector` which we would use in connecting `Page B` to the route progress from the initialized requests. Luckily, `react-kunyora` provides us with this two components, however we would be discussing the `Connector` component in this section and the `Router` component in a later section.

The `Connector` component is built using the `render props` idealogy and provides a functionliaty which allows it to be `code splitted` or not. It can also be looked at as a top level component since ideally, you would want to code split majority of your components from the `route` level. Therefore in this section, we would be building a very simple exmaple centered on using this component.

* [`Techniques of Code Splitting`](connector_component.md#techniques-used-in-code-splitting)
* [`Developing an invoice generating application`](connector_component.md#developing-an-invoice-generating-application)

## Techniques used in Code Splitting

Code splitting can be basicaslly done in two ways:

* **Code splitting from the route level** : This can be seen as a top level code splitting technique because it encapsulates the page or a particular route itself. This means that when a route is required by the browser, all the UI needed to build the screen are loaded on demand. This way, we can conceptually break all our pages into smaller chunks based on the route and load the data we need on demand. We would show an example of this in our exmaple which we would present soon.

* **Code splitting from the component level** : This can be seen as a lower level code splitting technique because we conceptually code split our component within page. This means that if we had a `view` containing an `editor`, a `tool-tip` and an `alert-box`. We would conceptually code split the `alert-box` within that same component since we do not need it loaded on initial mount and would only require to make it visible when the user performs an action such as clicking on a button to trigger its visibility. However, one needs to be very technical when performing this pattern of code splitting because the component required would be downloaded over a network.

## Developing an invoice generating application

In this section of the documentation, we would be creating a simple report based system. The application would ask a user to enter some details into an html form, then we will use the supplied information to generate an basic invoice.

Let's develop the component in our application that would be used in collecting the user inputs.

```javascript
/**
 * Index.js
 **/
import React from "react";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Connector } from "react-kunyora";

export default class App extends React.PureComponent {
  state = {
    isInvoiceVisible: false,
    name: "",
    paying: 0
  };

  render() {
    let { name, paying, isInvoiceVisible } = this.state;
    return (
      <center>
        <input
          type="text"
          value={name}
          onChange={evt => this.setState({ name: evt.target.value })}
        />
        <br />
        <input
          type="number"
          value={paying}
          onChange={evt => this.setState({ paying: evt.target.value })}
        />
        <br />
        <button onClick={() => this.setState({ isInvoiceVisible: true })}>
          Generate Report
        </button>
        <br />
        <p style={{ marginTop: 20 }}>
          {isInvoiceVisible && (
            <Connector
              name="invoice"
              loadingComponent={<span>Generating</span>}
              errorComponent={null}
              loader={() => import("./Invoice")}
            >
              {Invoice => <Invoice {...this.state} />}
            </Connector>
          )}
        </p>
      </center>
    );
  }
}

render(<App />, document.getElementById("root"));
registerServiceWorker();
```

The above code simply creates a simple components which collects the name and the amount a user would be paying and feeds it to the `Invoice` component which would be dynamically loaded by the `Connector` when the `generate invoice` button is clicked. Also we see its quite easy to create a `Connector`, all we do is to supply the `name` prop for our `Connector` which is compulsory and can be anything, then we supply a `loadingComponent` prop which our `Connector` uses in displaying a `loading` notification when the `component` is being downloaded. Also we use a `loader` component which our component uses to dynamically import the new component.

Lets go ahead to finish the creation of our invoice by creating the `Report` component.

```javascript
/**
 * Invoice.js
 */
import React from "react";

const Invoice = props => {
  let balance = 10000 - Number(props.paying);
  return (
    <div>
      <span>Name: {props.name}</span>
      <span>Amount Paid: {props.paying} </span>
      <span> Goods Bought: Spare Parts </span>
      <span>Balance: {balance > 0 ? balance : 0} </span>
    </div>
  );
};

export default Invoice;
```

The above code just creates a simple Invoice. Run your application to see it works. Please check the [Connector Api reference](connector_component_api_overview.md)
