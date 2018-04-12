---
id: kunyora_provider_api_reference
title: KunyoraProvider API Overview
---

This component is a `top level component`. A `Top level component` is a component which typically wraps the whole of your application together with the essence of exposing some sort of functionalities to it. The `KunyoraProvider` component exposes 2 props; which we will examine in this section.

# Props

* [client](kunyora_provider_api_reference.md#client)
* [store](kunyora_provider_api_reference.md#store)

# Reference

## Props

### `client`

This specifies an instance of the client created using `KunyoraClient`

| Type | Required |
| ---- | -------- |
| any  | Yes      |

### `store`

```javascript
client.store;
```

This specifies the store exposed by the `client` which `react-kunyora` uses internally

| Type | Required |
| ---- | -------- |
| any  | Yes      |
