import React from 'react'
import createReactClass from 'create-react-class'
import withStyles from '@material-ui/styles/withStyles'


module.exports = withStyles(styles)(createReactClass({
  displayName: 'Main',


  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
          <h1> World Countries </h1>
      </div>
    )
  }
}))


function styles () {
  return {
    container: {
      padding: 36
    }
  }
}