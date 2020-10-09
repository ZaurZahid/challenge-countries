import React from 'react'
import ReactDOM from 'react-dom'

import Main from './main.jsx'

var main = document.createElement('div')
document.body.appendChild(main)
ReactDOM.render(React.createElement(Main), main)