---
id: mutation_component
title: Mutation Component
---

A Mutation component is a low level component which you would typically use in making `post, put, patch or delete` request which all cause side effects to your databases. This component is one which is exported from `react-kunyora`. It uses the `render prop` pattern of reactJs to provide your UI with functionalities which allow it to perform this mutations.+

In this section, we would be creating a very `simple todo list application`

* [`Creating a Todo List application`](mutation_component.md#creating-a-todo-list-application)
* [`Creating the client`](mutation_component.md#creating-the-client)
* [`Sending a Post Request to add a Note`](mutation_component.md#sending-a-post-request-to-add-a-note)

# Creating a Todo List application

In this section of the documentation, we would be creating a todo list application which we will use to update our database with a note that a user types. Its going to be a very simple application with just a simple input text field and a post button.

### **Creating the client**

Here, we would be creating the client for our application. We would assume that you are familiar with creating the client already and therefore we would explain other details that you should be aware of when using our library with `reactJs`. However, if you do not have enough knowledge about creating a `client`, then check our [`indepth tutorial docs`](kunyora_tutorial.md) and the [Kunyora Api Reference Configuration section](kunyora_api_reference.md#client-configration).

```javascript
/**
 * Index.js
 */
import React from 'react';
import {render} from 'react-dom';
import KunyoraClient from 'kunyora';
import {KunyoraProvider} from 'react-kunyora';
import registerServiceWorker from './registerServiceWorker';

import TodoList from './TodoList';

const client = KunyoraClient({
  baseURL: 'https://kunyora.herokuapp.com/',
  nouns: [{path: 'todo', name: 'todo'}],
});

const App = () => (
  <KunyoraProvider client={client} store={client.store}>
    <div>
      <TodoList />
    </div>
  </KunyoraProvider>
);

render(<App />, document.getElementById('root'));
registerServiceWorker();
```

The `client` above is created using just the `baseURL` and the `nouns` of the `config`. When using a view layer like `reactJs`, there is no need to specify the `thenables` and `catchables` properties in your config as `react-kunyora` automatically handles that for you internally and just feeds your UI with the result sent by the restful Api. Also we created a test url for this application on heroku which we specified in our `baseURL` property. We would also be connecting to the `/todo` routes. Then we go ahead to connect our whole application to a top level [KunyoraProvider](kunyora_provider_component.md) component while passing in the `client` instance and the `store` as props.

### **Sending a Post Request to add a Note**

Lets go ahead to create the UI for our todo list application. The UI would basically allow users to add a todo as well as get the list of todos that has been added by the user. We are not going to complicate issues, so the UI would be as simple as possible, please feel free to add css to beautify the UI.

```javascript
import React from 'react';
import {Query, Mutation} from 'react-kunyora';

class List extends React.PureComponent {
  state = {
    todo: '',
  };

  createTodo = () => {
    this.props.mutate({
      data: {content: this.state.todo},
    });
  };

  render() {
    let {todo} = this.state,
      {loading} = this.props;
    return (
      <div>
        <textarea
          type={'text'}
          placeholder="enter a todo"
          value={todo}
          onChange={(ev) => this.setState({todo: ev.target.value})}
        />
        <span>{loading ? 'Adding....' : 'Added'}</span>
        <button onClick={this.createTodo}>Create Todo</button> <br />
        <b> List of Added Todos </b>
        <Query
          operation="getTodo"
          renderLoading={<span> ...Loading </span>}
          renderError={<span> Error occurred while loading Todo </span>}>
          {(todo) => {
            let component =
              todo.data.length === 0 ? (
                <p> No Todo Yet </p>
              ) : (
                todo.data.map((todo, i) => <p key={i}>{todo.content}</p>)
              );
            return component;
          }}
        </Query>
      </div>
    );
  }
}

const TodoList = (props) => (
  <Mutation
    operation="createTodo"
    options={{refetchQueries: [{operation: 'getTodo'}]}}>
    {(mutationState, mutate) => (
      <List mutate={mutate} loading={mutationState.loading} />
    )}
  </Mutation>
);

export default TodoList;
```

The code above creates a todo by sending a `post` request to the database which typically adds a new `todo` to our online store. It also informs the user of the `loading` progress of the todo to be added as well as generate a list of recently added `todos`. We make use of two component which we import from `react-kunyora`. The `Query` component helps in fetching a list of recently added `todos`. You can refer to the [Query tutorial](query_component.md) for a short tutorial on using the `Query` component, thereafter check out the [Query Api docs](query_component_api_overview.md) for references on this component.

The `Mutation` component is used in our example above to create the `todo` since it sends a `post` request which creates the text entered by our user. Let's go ahead to explain the props we used in the `Mutation`component to achieve our purpose.

* **operation** : This prop is used to specify the command to run. Typically in a mutation request, operations are formed by camel-casing `create` which is mapped to `post`, `update` mapped to `put`, `partUpdate` which is mapped to `patch` and `delete` with the `name` or `path` attribute supplied by the user when creating the `client` and in our case, this is `todo`, hence the operation `createTodo`. For a full understanding of how `operations` are formed, please refer to the [Introduction to operation](introduction_to_operation.md) section of the application for a more detailed explanation.

* **options** : This prop is used to specify some custom configs which would be used alongside our mutation request. we can use it to specify a `config` which a mutation would use initially when making a request and the `refetchQueries` which we use to refetch some set of queries after a mutation must have been applied successfully. In our example above, we specify `refetchQueries` which we use to automatically get the list of all the `todos` after creating one. This functionality proves the power in declarativeness of data. Please refer to the [Mutation Api reference](mutation_component_api_overview.md) for a full overview of what is achievable with this prop.

Now, lets go ahead to explain the parameters passed to our `this.props.children` of the `Mutation` component.

* **mutationState** : This parameter contains the state of our mutation request which could either be in-flight or resolved. The `loading` property is the only property contained in this object. Ideally, it allows us keep a reference to the current loading condition of our `request` while still managing everything declaratively. The `loading` state can only be `true` or `false` but cannot be both at the same time.

* **mutate**: This parameter is a function that we need to call to actually carry out the mutation on the database. It accepts a single object which is the `config` that should be sent with the request that we make. This `config` parameter it accepts is similar to that used by [axios](https://github.com/axios/axios/blob/master/README.md). In our example above, we use this function to create a `todo` in a function named `createTodo`.

The rest of our application is self explanatory since its just basic `reactJs`. Please refer to the [Mutation Api Reference](mutation_component_api_overview.md) for more insights into what is achievable by the `Mutation` component.
