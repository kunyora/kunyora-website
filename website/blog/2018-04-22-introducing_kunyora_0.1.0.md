---
title: Kunyora - A new way to write disposable api request code
author: Anifowoshe Gbenga David 
authorURL: http://twitter.com/David_Ani_s
---

We are excited to introduce the pre-release version of `Kunyora` which would help manage restful api request. `Kunyora` is a rest based client for Javascript applications built for writing declarative code while making Api request and ensuring that those requests are also disposbale. 

Kunyora extends axios by making it possible for teams to develop softwares whose html templates are loosely coupled to the actual Javascript code making the request. We found out over time that great softwares need to follow 3 basic principles which were: 

- `Reusability`
- `Composability`
- `Disposability` 

These 3 principles, we believe has been the success for ReactJs, VueJs, styled-components and many other libraries which are component based. This libraries make it very easy for users to develop UI's using a component based architecture which follows the `DRC` principle stated above. However, when we design applications which make api request, we clearly write imperative code since we tell our application how to handle loading, error and the data states. Also it becomes conceptually difficult to refetch queries after making a post, update or delete request(mutations) since our UI's end up being littered with `then` and `catch` promise callbacks. This ends up breaking the rule of `disposability` since it becomes time consuming to delete code since one has to keep tracing promises calls bound to the html templates throughout the entire codebase. 

Kunyora solves this problem by providing you with a thinking approach; **"which tells you that a `route` should be exposed to all the request methods, and operations to a route should be handled in two objects called `thenables` and `catchables`"**.  This makes it very easy to trace calls and easily delete the code. We have also tried as much as possible to avoid the `Single File for Configuration (SFC)` problems of software applications. `React-Kunyora` allows the states of your restful applications to be managed declaratively within itself. It allows you to build apps with a routing pattern similar to youtube and github with features that allow you to prefetch request before route while feeding your UI's with the route progress declaratively. We see it more like an ApolloClient for Rest. `Axios` is a great library, so all we did was extend axios and empower users with the capability to write declarative code.   

Kunyora is currently in its first phase, which would allow it to grow very rapidly. The library also has integrations with ReactJs and should provide support for other view libraries such as AngularJs and VueJs soon. Kunyora, in the long term would be responsible in handling the encoding and decoding of restful responses which we believe can increase the speed and reduce the network-response time of web and native apps. This feature should come in before the official 1.0 release. 

Finally, we found a problem and we decided to address it using the Kunyora library which we believe would benefit everyone. We hope and know that Kunyora would solve a lot of problems and we would love to see it grow to a communtiy driven library. All suggestions and changes are welcomed on various threads.  For the latest news on Kunyora, please follow [@David_Ani_s](https://twitter.com/David_Ani_s) and [@Kayslaycode](https://twitter.com/Kayslaycode) on Twitter. A public account would be created for the project soon. 

Please check out our [vision](/kunyora/docs/vision.html) on Kunyora, also you can check out the [Getting started docs](/kunyora/docs/getting_started.html) to get started with Kunyora and the [`Query component Docs`](/kunyora/docs/query_component.html) to get started with react-kunyora. 

Thanks for taking your time to read our first official blog post, we look forward to getting your feedbacks. 
