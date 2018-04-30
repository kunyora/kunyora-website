/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

const FeatureTitle = props => <h2 className="projectTitle">{props.title}</h2>;

const HomeCallToAction = props => {
  let language = props.language || "";
  return (
    <Container padding={["bottom", "top"]}>
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">
            <Button href={docUrl("getting_started.html", language)}>
              GET STARTED
            </Button>
            <Button href={docUrl("quick_tutorial.html", language)}>
              QUICK TUTORIAL
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self"
};

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || "";
    return (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="projectLogo">
              <img src={imgUrl("headerIcon.png")} />
            </div>
            <div className="inner">
              <h2 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
              </h2>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <Button href={docUrl("getting_started.html", language)}>
                      GET STARTED
                    </Button>
                    <Button href={docUrl("quick_tutorial.html", language)}>
                      QUICK TUTORIAL
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Features extends React.PureComponent {
  render() {
    return (
      <div>
        <Container id={this.props.id} background={this.props.background}>
          <FeatureTitle title="Build UI component and sync with data" />
          <small style={{ fontSize: 15 }}>
            Kunyora makes it easy to sync your UI's with your restful store by
            removing the complexity in writing imperative code and replacing
            these code with declarative code without complicating data flow.
          </small>
          <MarkdownBlock>
            {`\`\`\` javascript
              <Query
                operation="getPostCount"
                options={{fetchPolicy: "network-only",config: { params: { category: "education" } }}}>
                {(postCount, fetchMore, refetchQuery) => <Counter items={postCount.data} />}
              </Query>
          `}
          </MarkdownBlock>
        </Container>
        <br />
        <Container>
          <FeatureTitle title="Write Code that are not just reusable, but also composable and disposable." />
          <small style={{ fontSize: 15 }}>
            Kunyora extends axios by making it easy to integrate data with your UI's.
            With react-kunyora, you don't need to think about managing request states, neither do you need to think about managing loading, error or even data notifications imperatively.
            You can now build apps that are not just resuable, but also composable and disposable.
          </small>
          <MarkdownBlock>
            {`\`\`\` javascript
              <Mutation
                operation="createUser">
                {(mutationState, mutate) => (
                  <button onClick={() => mutate({data: {name: "Gbenga"}})}>
                    Add User
                  </button>
                )}
              </Mutation>
          `}
          </MarkdownBlock>
        </Container>
        <br />
        <Container>
          <FeatureTitle title="Build for both native Android and Ios Platforms in React-Native" />
          <small style={{ fontSize: 15 }}>
            With Kunyora and its integrations with client libraries such as
            React Native, you can compose your native views exposed by this
            libraries with data from your restful Api. Its easy and works in the
            same pattern as the web. Same API for every purpose
          </small>
          <MarkdownBlock>
            {`\`\`\` javascript
              renderLoadingIndicator = () => (
                <ActivityIndicator
                  animating={true}
                  size={30}
                  color="#263238"
                />
              )

              render(){
                return (
                  <Query
                    operation="getRecords"
                    renderLoading={this.renderLoadingIndicator()}
                  >
                    {(feeds, fetchMore, refetchQuery) => (
                      <View>
                        <Text>{feeds.data}</Text>
                      </View>
                    )}
                  </Query>
                )
              }
          `}
          </MarkdownBlock>
        </Container>
        <br />
        <Container>
          <FeatureTitle title="Manage Request Prefetch before Route Push" />
          <small style={{ fontSize: 15 }}>
            You can manage the prefetch of requests before a page transition occurs. In essence, Kunyora helps you store the
            response of a requested route even before a page transition occurs.
          </small>
          <MarkdownBlock>
            {`\`\`\` javascript
              <Router
                name="content_router_link"
                resources={[{operation: "getAdminPosts",fetchPolicy: "network-only"},{operation: "getUserLikes", fetchPolicy: "cache-first"}]}
                loader={() => import("../Content")}
                onRequestRoute={() => this.props.history.push("/content/1?draft=false")}>
                {(routeState, fetchProgress, push) => {
                  let _props = {routeState, fetchProgress, push};
                  return (
                    <HomeScreen {..._props}/>
                  );
                }}
              </Router>
          `}
          </MarkdownBlock>
        </Container>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    let language = this.props.language || "";

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <HomeCallToAction />
        </div>
      </div>
    );
  }
}

module.exports = Index;
