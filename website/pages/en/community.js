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
            You can use stack Overflow to ask questions pertaining to Kunyora
          </div>
          <h2> Twitter </h2>
          <div style={{ marginBottom: 20 }}>
            For the latest news on Kunyora, follow <a href="https://twitter.com/David_Anis_s" target="blank">@David_Anis_s</a> and <a href="https://twitter.com/Kayslaycode" target="blank">@Kayslaycode</a> on Twitter. A public account would be created for the project shortly before we hit 1.0.
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Community;
