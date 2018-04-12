const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

class Community extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <h1>Where to Get Support</h1>
          <div>
            Kunyora is built and currently maintained by a small team of two
            engineers. A ReactJs engineer and a NodeJs engineer. However, we
            believe that the maintainers would increase over time. If you need
            help, then the right place to go depends on the type of help needed.
          </div>
          <h2> Stack Overflow </h2>
          <div>
            You can use stack Overflow to ask questions. Read through the
            <a>existing questions tag</a> in stack overflow or
            <a>ask your own</a>.
          </div>
          <h2> Twitter </h2>
          <div style={{ marginBottom: 20 }}>
            For the latest news on Kunyora, follow @kunyora on Twitter
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Community;
