import React, { Component } from 'react'

export default class Media extends Component {
  render() {
    return (
      <div>
        <div>
            <img src={process.env.PUBLIC_URL+"/img/"+this.props.img}className="mr-3" alt="media" width="100" />
            <div className="media-body text-left">
            <h5 className="mt-0">{this.props.title}</h5>
            {this.props.children} 
        </div>
      </div>
      </div>
    )
  }
}
