---
id: version-0.1.0-kunyora_provider_component
title: KunyoraProvider Component
original_id: kunyora_provider_component
---

This is a top level container used by `react-kunyora` to connect the whole application to the `client` library `kunyora`. Its a very simple component which must wrap your whole application so that `react-kunyora` could pass the `client` and `store` to it.

Lets examine a quick example of using `KunyoraProvider` in action.

```javascript
import KunyoraClient from 'kunyora';
import {KunyoraProvider} from 'react-kunyora';

const client = KunyoraClient({
  baseURL: 'SPECIFY_YOUR_BASE_URL_HERE',
  nouns: [{...EnterYourNounsHere}],
});

export default (App = (props) => (
  <KunyoraProvider client={client} store={client.store}>
    <TheRestOfYourApplication />
  </KunyoraProvider>
));
```

The above code just wraps the rest of our application within the `KunyoraProvider` top level component and passes the `client` and the `store` prop to it. The `client` prop is created from `KunyoraClient` and the `store` is exposed by the `client` itself.

Please check the [Api reference Docs](kunyora_provider_api_reference.md) for a better insight into the `KunyoraProvider` component.
