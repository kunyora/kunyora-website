---
title: Rethinking - Disposability 
author: Anifowoshe Gbenga David 
authorURL: http://twitter.com/David_Ani_s
---

> 3 basic principles make good softwares:
>
> * Reusability
> * Composability
> * Disposability

> However, building truly disposable software makes it comfortable for engineers to work on the project overtime.

After recently publishing the Kunyora library and making a recent tweet about using the library in writing disposable Api code, I got lots of direct messages asking me to explain disposability and how Kunyora solves that problem. Luckily, **_The English Dictionary_** has provided a solid definition for the term; it defines the term `disposable` as `any object that is designed to be discarded`. I believe that building softwares isn't just about making sure that your code base passes some unit or integration test but it is also about how comfortable engineers would feel while working on the same software overtime.

## My Experience with writing indisposable code

Have you ever been afraid to remove a css class name because of the fear that it could disorganise your UI especially when building large applications ?

About some years ago, I had the opportunity to work with a very small group of friends building a web based student platform. At the time, we were building the platform using an agile approach and we needed to iterate fast since we got immediate feedbacks from the customer which led to constantly changing the code base. We had to delete some html elements and also remove the css they were bound to. However, as the code base of our web app grew larger, we found out that it became more difficult to delete code. The css files consisted of a lot of class names, and sometimes we were clueless and afraid to remove some classes because of the fear of disorganization it could cause to some html elements using them that we had no knowledge of. Well, the only thing we did at the time was to leave these class names and add new class names which were mapped to the newly added elements. Admittedly, we made the wrong decisions because our css files grew larger ๏︿๏. Shortly after finishing up with the project, I found out that the we had those issues because the software wasn't disposable. I felt that if we had a better tool to make our code base more disposable, it would have saved us a lot of hustle.

## An approach to make the code base disposable

```javascript
  /**
   * ReactJS and Styled-component approach to solving disposability
   * using component-based architecture and element direct styling  
  */
  const Container = styled.div
    margin-top: 20px;

  <Container>
    {...someChildElements}
  </Container>
```

Fast forward some years later, I found ReactJs and styled-components and decided to revamp the codebase again. ReactJs helped us manage our html elements by providing us with a component based architecture which made our UI easy to revamp and more predictable while making updates. Styled-components (css-in-js) however provided us with the power to style html elements directly which in turn made our codebase highly disposable 🙌. We were no longer afraid to delete code because with styled components, deleting the html element or in our case React elements/component also ensured that the css associated with the element was gone. Beautiful right 😎. Well ever since, I have found love in disposability using composable-css which is popularly known as css-in-js. Styled components has its disadvantages too in terms of file sizes but we went around that.

## Problems with writing indisposable Api code

```javascript
  axios({
    method: "post",
    baseURL: "someURL"
  }).then(data => {
    ...doSomething
  })
```

Fast-forward to 2018, I noticed there were still lots of imperative Api code bases out there written with axios which polluted declarative environments provided by libraries like ReactJs or VueJs. Also it became very difficult to delete code if one is carrying out lots of complex operations such as refetching some queries after a user must have performed a post operation.

Imagine you were building a complex web application which had a `/feeds` path and this path was exposed to the get, post , patch and delete request methods. Here are two quick questions:

* How would you structure calls to this path such that a new engineering recruit could easily tell all the methods this path was exposed to?
* How predictable can your application be if calls to this path were made at various views in your application?

Finding answers to the questions above could depend on one's level of expertise in developing predictable software. However, if the web application was not built to be predictable then its definately not disposable. Functional programming is wonderful but it doesn't totally mean that everyone using this paradigm gets to write disposable functions. Infact, it's possible to write indisposable functions when deeply composing functions. At times, mutations across codebases could also lead to indisposable code if variables have two to many places where they are changed.

## Kunyora's approach to writing disposable Api code

```javascript
KunyoraClient({
  ...someOtherSetupOptions,
  thenables: {
    key: value,
  },
  catchables: {
    key: value,
  },
});
```

However, we have found ways to create disposable codebases either through component based architecture, immutability, composition, css modules, css-in-js or various other techniques. Kunyora also addresses the problems of indisposability by exposing a path to all the request methods and providing you with two(2) objects `thenables` and `catchables` that allows you to handle both success and error calls using a `key-value based map` when performing api requests. With a declarative component based environments like ReactJs, Kunyora achieves better disposability by leveraging on the component-based architecture of this libraries. Its totally fine if introducing disposability to your code base brings a little redundancy, all that matters is that everyone working on the project feels comfortable throwing code away.

Since Kunyora is built on axios, it allows you perform most but not all functionalities provided by the axios library.

**_Sarah Drasner_** made a [tweet](https://twitter.com/sarah_edo/status/991421712989208576) recently and I quote

> Someone was recently telling me they were a "Code Ninja". I don't want to work with a Ninja, they leave a bloody mess. I want to work with a "Code Janitor". Comes in the middle of the night, cleans things up, you only know they were there because everything is organized and tidy.

A code Janitor cleans up the code base by making sure that its highly disposable. Lastly, It really doesn't matter if you are a functional programmer or a classical programmer, both coding paradigms offer several ways to write truly disposable code and I believe that apart from reusability and composability, disposability is also a very important coding feature to consider when building softwares. A predictable software is a disposable software.

You might want to check out Kunyora's [Vision](/kunyora/docs/vision.html) and the [Getting Started Tutorial](/kunyora/docs/getting_started.html)
