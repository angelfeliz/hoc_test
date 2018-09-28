import React, { Component } from 'react'
import './gallery.css'

export function withGalleryFeat(WrrapedComponent, listCard) {
    return (
        class extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    name: listCard.catalogName,
                    list: listCard.collection || [],
                    copyList: listCard.collection || []
                }
                
            }

            onDelete = (key) => {
               console.log('Delete item ', key);
               let newList = [];
               newList = this.state.list.slice(0,key).concat(this.state.list.slice(key+1))
               console.log('new array ', newList);
               this.setState({...this.state, list: newList});
            }

            render() {
                
                return (                    
                    <div className="gallery">
                        {
                         this.state.list.length > 0 ?
                          this.state.list.map((item, index) => {
                              return (
                                   <WrrapedComponent 
                                     onDelete = { this.onDelete }
                                     {...item} { ...this.props }
                                     index = { index }
                                   />
                              )
                          })
                          :
                          <div>
                              <p>No item to display</p>
                              </div>
                        }
                    </div>
                )
        
        }
      }
    )
  
}

