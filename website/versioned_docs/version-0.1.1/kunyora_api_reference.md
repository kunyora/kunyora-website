---
id: version-0.1.1-kunyora_api_reference
title: API Reference (Kunyora)
sidebar_label: API Reference
original_id: kunyora_api_reference
---

This section of the documentation covers the Api reference of `Kunyora`. It is divided into 3 sections, the `configuration` passed to the client, `exposed methods` by the client and the `configuration` passed to the methods which interact with the api.

## Client Configration(Options)

* [`baseURL`](kunyora_api_reference.md#baseurl)
* [`nouns`](kunyora_api_reference.md#nouns)
* [`thenables`](kunyora_api_reference.md#thenables)
* [`catchables`](kunyora_api_reference.md#catchables)

## Methods

* [`operations`](kunyora_api_reference.md#operations)
* [`middleware`](kunyora_api_reference.md#middleware)
* [`store`](kunyora_api_reference.md#store)

# Request Methods Configration

* [`Axios instance config`](kunyora_api_reference.md#axios-instance-config)

# Reference

## Client Configuration(Options)

### `baseURL`

```javascript
let client = KunyoraClient({baseURL: 'ENTER_THE_URL_OF_YOUR_ENDPOINT'});
```

This should contain your restful endpoint url

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `nouns`

```javascript
let client = kunyoraClient({nouns: ['ENTER_YOUR_PATH']});

//OR

let client = kunyoraClient({
  nouns: [{path: 'ENTER_YOUR_PATH', name: 'ENTER_AN_OPTIONAL_NAME'}],
});
```

specifies an array of routes or paths exposed by the restful api

| Type                               | Required |
| ---------------------------------- | -------- |
| array(enum(string, config.Object)) | Yes      |

**config.Object** | Name | Type | Required | Description | | ---- | ------ | ------- | ---------- | | path | string | Yes | contains the route to access | name | string | No | contains a name that can be camel-cased with a default operation to access a specific route e.g we could have getName. Refer to the [Introduction to operation Docs](introduction_to_operation.md) to learn more about operations|

### `thenables`

```javascript
let client = kunyoraClient({
  thenables: {
    ...other_operations,
    get: function(response, name) {
      /*do something. Mostly used for general purposes*/
    },
    ['ENTER_THE_OPERATION_TO_HANDLE_HERE']: function(response) {
      /* do something. Mostly used for specific purposes */
    },
  },
});
```

specifies an object that you should use to handle success responses from your api. This uses a key-based mapping with the operations to handle the success response. If this property is not passed, then kunyora defaults to returning a promise when the operation is called.

| Type   | Required |
| ------ | -------- |
| Object | No       |

**Operations you can use with thenables as keys**

| Name             | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| get              | function | No       | can be used as a key to handle all get requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                                      |
| create           | function | No       | can be used as a key to handle all posts requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                                    |
| update           | function | No       | can be used as a key to handle all Put requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                                      |
| delete           | function | No       | can be used as a key to handle all delete requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                                   |
| partUpdate       | function | No       | can be used as a key to handle all patch requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                                    |
| `your_operation` | function | No       | this is a specific operation that `kunyoraClient` checks to handle any incoming success response. This is formed from camel-casing one of the five default operations with the `name` property specified in your `nouns` or your `path` property incase a `name` property is not specified. Refer to the [Introduction to operation Docs](introduction_to_operation.md) to learn more about operations |

**parameters passed to the operations supplied as keys to thenables**

| Name     | Type   | operations                                                | desciption                                                                                                             |
| -------- | ------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| response | Object | get, delete, create, update, partUpdate, `your operation` | This is a response object containing details used in making the resquest and the actual success response from your api |

### `catchables`

```javascript
let client = kunyoraClient({
  catchables: {
    ...other_operations,
    get: function(error, name) {
      /*do something. Mostly used for general purposes*/
    },
    ['ENTER_THE_OPERATION_TO_HANDLE_HERE']: function(error) {
      /* do something. Mostly used for specific purposes */
    },
  },
});
```

specifies an object that you should use to handle error responses from your api. This uses a key-based mapping with the operations to handle the error response. If this property is not passed, then kunyora defaults to returning a promise.

| Type   | Required |
| ------ | -------- |
| Object | No       |

**operations you can use with catchables as keys**

| Name             | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| get              | function | No       | can be used as a key to handle all get requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                             |
| create           | function | No       | can be used as a key to handle all posts requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                           |
| update           | function | No       | can be used as a key to handle all Put requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                             |
| delete           | function | No       | can be used as a key to handle all delete requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                          |
| partUpdate       | function | No       | can be used as a key to handle all patch requests which do not have a specific operation specified in the thenables                                                                                                                                                                                                                                                                           |
| `your_operation` | function | No       | this is the operation that `kunyoraClient` checks to handle any incoming error response. This is formed from camel-casing one of the five default operations with the `name` property specified in your `nouns` or your `path` property incase a `name` property is not specified. Refer to the [Introduction to operation Docs](introduction_to_operation.md) to learn more about operations |

**parameters passed to the operations supplied as keys to catchables**

| Name  | Type   | Operations                                                | desciption                                                                                                         |
| ----- | ------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| error | Object | get, delete, create, partUpdate, update, `your operation` | This is an error object containing details used in making the resquest and the actual error response from your api |

## Methods

### `Operations`

```javascript
client['YOUR_OPERATION']({...axios_instance_config});
```

used to communicate with your restful backend. The operation is formed from camel-casing one of the five default operations with the `name` property specified in your `nouns` or your `path` property incase a `name` property is not specified. Please check out the [InDepth Tutorial](kunyora_tutorial.md) section of the documentation for a practical example on how this is done.

The `axios instance config` is similar to that provided by the axios documentation.

### `middleware`

```javascript
client.middleware({
  useBeforeRequest: function(headers) {
    //return headers
  },
  useAfterResponse: function(response) {
    // do something with any response gotten
  },
});
```

specifies two `optional` callbacks that would be used by the application if present before a request is sent and after a response is gotten.

**parameters passed to the middleware's object argument** | Name | Type | Required | Passed Parameter Type | Description | | ---- | ---- | -------- | -------------------- | ----------- | |useBeforeRequest | function | No | Object | This function is called before a request is sent. You must return the headers here so the the client instance could make use of it. This function is passed the header object as a parameter | |useAfterResponse | function | No | Object | This function is called after a response is gotten but before it is handled by any client side code if present. This function is passed the response object as a parameter |

### `Store`

```javascript
client.store;
```

For now, we have not found any external usage for this module yet. However, it is currently used by our client-side view libraries like ReactJs to handle the state of our application. It also has a lot of potentials to be used outside of this. Please get across to us incase you feel this should be made public for use. However, for now we would really not go deep into the API's exposed by this module , but we would however update the docs as time goes on.

| Type   | Required |
| ------ | -------- |
| Object | No       |

## Request Methods Configration

### `Axios instance config`

```javascript
let client = kunyoraClient({...config});

client['YOUR_OPERATION']({params: {}, data: {}, ...otherAxiosConfigs});
```

The instance config is very similar to that provided by axios. Please refer to the [axios documentation](https://github.com/axios/axios/blob/master/README.md)
