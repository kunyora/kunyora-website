---
id: lasa_provider_component
title: LasaProvider Component
---

This is a top level container used by `react-lasa` to connect the whole application to the `client` library `lasa-client`. Its a very simple component which must wrap your whole application so that `react-lasa` could pass the `client` and `store efficiently` to it.

Lets examine a quick example of using `LasaProvider` in action

```javascript
import LasaClient from "lasa-client";
import { LasaProvider } from "react-lasa";

const client = LasaClient({
  baseURL: "SPECIFY_YOUR_BASE_URL_HERE",
  nouns: [{ ...EnterYourNounsHere }]
});

export default (App = props => (
  <LasaProvider client={client} store={client.store}>
    <TheRestOfYourApplication />
  </LasaProvider>
));
```

The above code just wraps the rest of our application within the `LasaProvider` top level component and passes the `client` and the `store` props to it. The `client` props is created from `LasaClient` and the `store` is exposed by the `client` itself.

Please check the [Api reference](lasa_provider_api_reference.md) for better insight into the `LasaProvider` component.
