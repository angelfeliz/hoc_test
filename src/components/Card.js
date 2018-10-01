import React from 'react'
import PropTypes from 'prop-types'
import './card.css'

const numberWithCommas = (x) => {
    x = x || 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const Card = (props) => {
    
    return (
        <div key={props.index} className="card">
            <div className="header"><h4>{props.name}</h4></div>
            <div className="body">
               <img src={props.imageUrl} alt={`pic ${props.name}`}/>
            </div>
            <div className="footer">
              <button onClick={() => props.onDelete(props.index)}>Delete</button>
              <span>{numberWithCommas(props.price)}</span>
            </div>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    removeFun: PropTypes.func
}

Card.defaultProps = {
    price: 0
}
export default Card
