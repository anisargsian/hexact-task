import React, { Component } from 'react';
import './App.css';

import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import Keywords from './components/Keywords/Keywords';
import Search from './components/Search/Search';

const client = new ApolloClient({
  uri: "https://api.hexometer.com/v1/ql"
})

const KEYWORDS_QUERY = gql`
{
    contentText {
      en {
          key
          value
      }
    }
}`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: false,
      filter: '',
      keywords: [],
      filteredKeywords: []
    }
  }

  changeInputHandler = (e) => {
    this.setState({ filter: e.target.value })
  }

  filterKeywords = () => {
    const keywords = [...this.state.keywords];
    const text = this.state.filter;
    let filteredKeywords = [];
    if (text && keywords) {
      filteredKeywords = keywords
        .filter(keyword => keyword.key.includes(text)|| keyword .value.includes(text))
        .sort((a, b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0));

      this.setState({ filteredKeywords: filteredKeywords, filtered: true });
    } else {
      this.setState({ filtered: false });
    };
  }

  setKeywords = data => {
    this.setState({ keywords: data.contentText.en })
  }

  render() {
    let filteredKeywords = null;
    let style = { display: true };
    if (this.state.filtered) {
      style = { display: "none" };
      if (this.state.filteredKeywords.length) {
        filteredKeywords = <Keywords keywords={this.state.filteredKeywords} />;
      } else {
        filteredKeywords = <p>No matches</p>;
      }
    }
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <div>
            <h2>Hexometer.com keywords</h2>
          </div>
          <Search
            changed={this.changeInputHandler}
            clicked={this.filterKeywords}
          />
          <Query query={KEYWORDS_QUERY} onCompleted={data => this.setKeywords(data)}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: ${error}</p>;
              return <Keywords style={style} keywords={data.contentText.en} />
            }
            }
          </Query>
          {filteredKeywords}
        </ApolloProvider>
      </div>
    )
  }
}

export default App;
