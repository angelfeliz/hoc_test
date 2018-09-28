import React, { Component } from 'react';
import './App.css';
import { withGalleryFeat as GalleryContainerWithFeature } from './components/withGalleryFeat'
import Card from './components/Card';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://api.crystallize.com/graphql"
});


class App extends Component {
  constructor() {
    super();
    this.state = {
       dataCard: []
    }
  }

  componentDidMount() {
    client
    .query({
      query: gql`
        {
          catalogue(url:"/bikes",tenantID:"demo") {
            name
            children {
              product {
                  id
                  imageUrl:product_image
                  price
                  name
              }
            }
          }
        }
      `
    })
    .then(result => {
      //This data object is to normalize the data for the Card Component
      let data = {
        catalogName: result.data.catalogue.name,
        collection: result.data.catalogue.children.map(item => item.product)
      }
      this.setState({...this.state, dataCard: {...data} });
  });
  }
  render() {
    //This HOC have the delete item functionality
    const EnhanceGallery = GalleryContainerWithFeature(Card, this.state.dataCard);
    return (
      
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello</h1>
        </header>
        <EnhanceGallery/>
      </div>
    );
  }
}

export default App;
