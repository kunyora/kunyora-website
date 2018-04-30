---
id: introduction_to_operations
title: Introduction to Operations
---

In this section, you will learn about operations and how they are formed and used. Learning about operations should get you acquinted with performing queries and mutations using Kunyora. Hence, this section will be as detailed as possible. With the knowledge of operations, you should be able to make requests and understand how kunyora executes your requests internally. 

Basically, we have 5 major http request methods amongst others. They are the `get, post, put, patch and delete` request headers. Internally, kunyora maps the headers as follows: 

| request method | How Kunyora represents the methods internally |
| --- | --- |
| get | get |
| post | create |
| put | update |
| patch | partUpdate |
| delete | delete |

The 5 internal representations of these request methods within Kunyora is what we like to call the `General Operations`, because they can be used within your `thenables` and `catchables` object to handle general responses. However, you would want to handle more specific operations. Let's take a deep dive into how specific operations are formed and used. 

Consider the code sample below: 

```javascript 
  import KunyoraClient from "kunyora";

  const client = KunyoraClient({
    url: "http://localhost:3000",
    nouns: [{path: "user", name: "user"}]
  })
```
In the code sample above, we specify a nouns array with a single object containing a `path` key whose value is user and `name` key whose value is user. When this is passsed to Kunyora, Kunyora generates request methods by camel-casing the general operations with the `name` key. so we have, 

* getUser 
* createUser 
* partUpdateUser 
* deleteUser 
* updateUser

These 5 methods above are called `specific operations`, and kunyora exposes them automatically to any application containing the same config as the code sample above. Hence, a typical request to get a user's information can be carried out using `getUser` and that to create a user can be carried out using `createUser`. Its that simple. However there are more complex scenarios. Consider the example code below:

```Javascript 
  import KunyoraClient from "kunyora";

  const client = KunyoraClient({
    url: "http://localhost:3000",
    nouns: ["user/comments"]
  })
```

In the code sample above, we supply an array of strings specifying the path instead of an object. Kunyora also generates the specific operations that this path exposes using a technique similar to that which was previously describe, however it does this in a somewhat different fashion. It removes all slashes or non-alphanumeric characters and then camel-case the results with the general operations. so the specific operations for the above code sample becomes:

* getUserComments 
* createUserComments
* partUpdateUserComments 
* updateUserComments 
* deleteUserComments 

However, it is best to specify your nouns as an array of objects instead of strings to avoid confusion. 

Consider the code samples below to improve your understanding on the topic.

**Example 1**

```Javascript 
  const client = KunyoraClient({
    url: "YOUR_URL",
    nouns: [{path: "posts", name: "mediumPosts"}]
  })
```
* getMediumPosts 
* createMediumPosts
* partUpdateMediumPosts 
* updateMediumPosts 
* deleteMediumPosts 

**Example 2**

```Javascript 
  const client = KunyoraClient({
    url: "YOUR_URL",
    nouns: [{path: "category/all", name: "myMusic"}]
  })
```

* getMyMusic
* createMyMusic 
* partUpdateMyMusic 
* updateMyMusic 
* deleteMyMusic 