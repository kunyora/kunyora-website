---
id: version-0.1.0-kunyora_tutorial
title: InDepth Tutorial
original_id: kunyora_tutorial
---

In this section, we will examine a very comprehensive tutorial on using `kunyora` for a simple Javascript application. we would cover the usage of the methods exposed by the library with detailed explanations of each of its methods. The `Kunyora` library was built on the popular `axios` library which is its underlaying library for carrying out request. We also assume that you have installed kunyora using npm or yarn. If you have not done so, please refer to the [installation](getting_started.md) guide to see how this is done. This tutorial will examine the basic usage of `kunyora` without any view library integration, so grab your laptop, seat tight and set your fingers ready to code. Yah!!!

* [`Building a Simple Calculator`](kunyora_tutorial.md#building-a-simple-calculator)
* [`Creating the basic html template for our application`](kunyora_tutorial.md#creating-the-basic-html-template-for-our-application)
* [`Creating the Kunyora client code for our application`](kunyora_tutorial.md#creating-the-kunyora-client-code-for-our-application)
* [`Creating a basic middleware`](kunyora_tutorial.md#creating-a-basic-middleware)

## Building a Simple Calculator

In this tutorial, we will be building a simple calculator which would interact with our restful backend in nodeJs. You can make use of any backend as the same principles still applies. The main functions of this calculator would be to:

* Save the name of the current user.
* Add 2 numbers together.

Simple Right!!! , Yah!!!. Now lets dive in and see how we can accomplish this with `kunyora`.

### **Creating the basic html template for our application**

Since every application needs a UI for users to interact with, lets go ahead and create a basic template that our application will use. This template is going to be quite ugly since we do not have css , but feel free to make yours colourful.

```html
  /* Calculator.html */

  <div>
    <p> Status: <span id="status"></span> <button id="verifyUser">Verify</button></p>
    <p> Name: <input type="text" id="name" /></p>
    <p>
      <input type="number" id="num1" /> + <input type="number" id="num2" /><br />
      Result: <span id="result"></span>
    </p>
    <button id="calculateBtn">Calculate</button>
  </div>

  <script type="text/javascript" src="https://unpkg.com/kunyora@0.1.0/dist/kunyora.js"></script>
  <script type="text/javascript" src="calculator.js"></script>
```

The code above is a simple html code sample for a calculator with 3 input fields. The first field would be used in collecting the user's name and saving it in our DB so he/she can be authenticated. The other 2 fields would be used in accepting numbers which would be used for numerical calculation. We also included a script pointing to the location of our client side Javascript code at the bottom of the html page

### **Creating the kunyora client code for our application**

Finally, Lets see how to integrate Kunyora with our client side Javascript code. Let's dive in.

```javascript
/**
 * calculator.js
 */

//you can use  your custom url if you wrote the above code yourself
window.onload = function() {
  var calculatorBtn = document.getElementById('calculateBtn'),
    name = document.getElementById('name'),
    num1 = document.getElementById('num1'),
    num2 = document.getElementById('num2'),
    status = document.getElementById('status'),
    result = document.getElementById('result'),
    num2 = document.getElementById('num2'),
    verifyUser = document.getElementById('verifyUser'),
    client = window.KunyoraClient({
      baseURL: 'https://kunyora.herokuapp.com/',
      nouns: [{path: 'user', name: 'user'}, {path: 'compute', name: 'compute'}],
      thenables: {
        createUser: function(response) {
          status.innerHTML = 'Verified';
        },
        getCompute: function(response) {
          result.innerHTML = response.data.result;
        },
      },
      catchables: {
        createUser: function(error) {
          status.innerHTML = 'Could not verify user';
        },
        getCompute: function(response) {
          result.innerHTML = 'Could not make calculations';
        },
      },
    });

  verifyUser.onclick = function() {
    status.innerHTML = 'Verifying...';
    client.createUser({data: {name: name.value}});
  };

  calculatorBtn.onclick = function() {
    var _num1 = num1.value,
      _num2 = num2.value;
    result.innerHTML = '...Calculating';
    client.getCompute({params: {num1: _num1, num2: _num2}});
  };
};
```

Okay, Whew!!! we are done typing. Try running the above code sample in a browser to see how it works. Let's do some explaning.

The code above simply creates a KunyoraClient instance which our client-side Javascript code can call to perform the request. So let's do some explaining of the config options.

* **baseURL**: This url points to the api end point on the server. In our case, this points to `https://kunyora.herokuapp.com/`

* **nouns**: This is an array of type `Object or string`. `Object` types should contain a `path` key which specifies the route which the library should make a request to and an optional `name` key which would be used when quering the API. If an array containing strings is supplied to the `nouns` property of the client, then this should be the `path` that the library should make the request to. Check out the [Introduction to operation Docs](introduction_to_operation.md) for a more detailed explanation on how operations are formed and used.

* **thenables**: This is a `success` object containing the operations used by `KunyoraClient` to interact with your apis as keys which would be used in mapping the requests to their respective function handlers. It also contains 4 operations by default; these operations include `get, update, partUpdate, delete and create`. The method basically helps in mapping successful response to their respective handlers. In the example code above, we handle `createUser` and `getCompute` api success response. The response object is passed as a parameter to their respective functions. Please refer to the thenables section of the [Api reference](kunyora_api_reference.md#thenables) for more details on this property and the argument its functions are bounded to.

* **catchables**: This is an `error` object containing the operations used by `KunyoraClient` to interact with your apis as keys which would be used in mapping the requests to their respective handlers. It also contains 4 operations by default; these operations include `get, update, partUpdate, delete and create`. The method handles errors from the api through the mapped keys. The error Object is passed as a parameter to their respective functions. Please refer to the catchables section of the [Api reference](kunyora_api_reference.md#catchables) for more details on this property and the argument its functions are bounded to.

The client instance exposes various operations that can then be used to interact with the Api. In our case, the client exposes `createUser` and `getCompute` as operations. This operations could also take a config which is typically similar to that supplied to the `axios` instance during initialization. Please refer to the [axios](https://github.com/axios/axios/blob/master/README.md) or the [Api reference](kunyora_api_reference.md) for a full insight into the config object. You can also refer to the [Introduction to operation Docs](introduction_to_operation.md) for a more detailed explanation on how operations are formed and used.

### **Creating a basic middleware**

Let's assume you want to build an application that requires you to send the `jwt` or an `appId` as an header token. You would mostly want to send this on every request, so the user can be authenticated before a mutation (i.e post, create, update) is performed on the database. `kunyora` allows you to carry this out using our custom `middleware` exposed by the client instance. Check out this example code.

```javascript
let client = KunyoraClient({...configs});

client.middleware({
  useBeforeRequest: function(header) {
    return {
      ...header,
      common: {
        ...header.common,
        jwt: 'YOUR_JWT_STRING',
      },
    };
  },
  useAfterResponse: function(response) {
    console.log('Hey the response object gotten is ', response);
  },
});
```

The above code seems self explanatory. Looking through, you would notice that we pass two distinct methods. The `useBeforeRequest` method is a callback that kunyora calls internally before performing a request. You can set headers here, however make sure that you return the headers set in this case. The `useAfterResponse` method is a callback that kunyora calls internally after a response object must have been gotten.

Please refer to the [Api reference](kunyora_api_reference.md) for a full overview of the methods and properties exposed by `KunyoraClient`.
