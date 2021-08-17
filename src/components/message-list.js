import Api from '../api'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles, makeStyles} from '@material-ui/core/styles';
import Toast from './Toast'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

  root2: {
    display: 'flex',
    flexGrow: 1,
    '& > *': {
      margin: '1%',
    },
    marginLeft: '10px'
  },
  paper: {
    margin: '10px', 
    padding: '15px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  error: {
    position: 'relative',
    backgroundColor : '#F56236',

  },
  gridStyling: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '75px'
  },

  warning: {
    position: 'relative',
    backgroundColor : '#FCE788'
  },
  info: {
    position: 'relative',
    backgroundColor : '#88FCA3'
  },
  TopButtonsStop: {
    right: '10px',
    marginBottom: '30px'
  },

  TopButtonsClear: {
    left: '10px',
    marginBottom: '30px'
  },

  globalButtonStyle: {
    height: '100%',
    position: 'absolute',
    top: '0px',
    right: '0px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 15,
    fontFamily:"Times New Roman",
    '&:hover': {
      boxShadow: 'none',
    },
  },
  errorButtonStyle: {
    backgroundColor: '#F56236',
    zIndex: 1
  },
  warningButtonStyle: {
    backgroundColor: '#FCE788',
    zIndex: 1
  },
  infoButtonStyle: {
    backgroundColor: '#88FCA3',
    zIndex: 1
  }

  })


const ColorButton = withStyles((theme) => ({
    globalButtonStyle: {
      right: '0',
    },
}))(Button);


class MessageList extends Component {

  constructor(...args) {
    super(...args)
    this.state = {
      single_message: '',
      messages: [],
      open: true,
      error: [],
      warning: [],
      info : [],
      errorToBeSentToChild: []
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  handleRemove(type, i){
    if(type === 'error'){
      this.setState(state => ({
        error: state.error.filter((x, j) => j !== i)
      }))
    }else if(type === 'warning'){
      this.setState(state => ({
        warning: state.warning.filter((x, j) => j !== i)
      }))
    }else{
      this.setState(state => ({
        info: state.info.filter((x, j) => j !== i)
      }))
    }
  }

  componentDidMount() {
    this.api.start()
  }
  
  messageCallback(message) {
    let join
    const { messages, single_message } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
      single_message: 
      message})
      if(single_message.priority === 1){
        let arr = [single_message.message]
        join = (arr).concat(this.state.error)    
        this.setState({error: join, errorToBeSentToChild: join})

      }else if(single_message.priority === 2){
        let arr = [single_message.message]
        join = (arr).concat(this.state.warning) 
        this.setState({warning: join})

      }else if(single_message.priority === 3){
        let arr = [single_message.message]
        join = (arr).concat(this.state.info) 
        this.setState({info: join})
      }    
  }

  renderButton() {
    const isApiStarted = this.api.isStarted()  //stop
    
    const {classes} = this.props
    return (
      <div>
        <Grid container spacing= {3}>
          <Grid item xs = {12} className={classes.gridStyling}>
            <Button className={classes.TopButtonsStop}
              variant="contained"
              onClick={() => {
                if (isApiStarted) {
                  this.api.stop()
                } else {
                  this.api.start()
                }
                this.forceUpdate()
              }}
            >
              {isApiStarted ? 'Stop Messages' : 'Start Messages'}
            </Button>

            <Button className={classes.TopButtonsClear} data-testid="clear-btn"
            variant="contained"
            onClick={() => {
              this.setState({messages: [], error: [], warning: [], info: [], errorToBeSentToChild: []})
            }}
            >
              CLEAR
            </Button>
          </Grid>
          
          <Grid container spacing = {3} className={classes.root2}>
          <Grid item xs >
            <Typography variant="h6" gutterBottom>
              Error Type 1
            </Typography>
            <Typography data-testid="count" variant="body1" gutterBottom>Count: {this.state.error.length}</Typography>
          </Grid>
          <Grid item xs >
            <Typography variant="h6" gutterBottom>
              Warning Type 2
            </Typography>
            <Typography data-testid="count2" variant="body1" gutterBottom>Count: {this.state.warning.length}</Typography>
          </Grid>
          <Grid item xs >
            <Typography variant="h6" gutterBottom>Info Type 3</Typography>
            <Typography data-testid="count3" variant="body1" gutterBottom>Count: {this.state.info.length}</Typography>
          </Grid>
        </Grid>

          <Grid item xs data-testid='error'>
            {this.state.error !== null 
              ? 
              this.state.error.map((e, i) => {
                return <Paper  className={`${classes.paper} ${classes.error}`} key = {i}>
                  {e}
                <ColorButton data-testid='clearmessage' className={`${classes.globalButtonStyle} ${classes.errorButtonStyle}`}
                        onClick={() => this.handleRemove('error', i)}
                        >
                         <Typography variant="caption">Clear</Typography> 
                    </ColorButton>
                    <br />
                </Paper>
              })
              : 
             null}
          </Grid>
          <Grid item xs>
              {this.state.warning !== null 
                  ? 
                this.state.warning.map((e, i) => {
                  return <Paper className={`${classes.paper} ${classes.warning}`} key = {i}>
                    {e} 
                  <ColorButton className={`${classes.globalButtonStyle} ${classes.warningButtonStyle}`} 
                        onClick={() => this.handleRemove('warning', i)}
                        >
                         <Typography variant="caption">Clear</Typography> 
                  </ColorButton>
                  </Paper>
                }) 
                  : 
                null}
          </Grid>
          
          <Grid item xs>
            {this.state.info !== null ? 
              this.state.info.map((e, i) => {
                return <Paper className={`${classes.paper} ${classes.info}`} key = {i}>
                  {e} 
                  <ColorButton className={`${classes.globalButtonStyle} ${classes.infoButtonStyle}`}
                        onClick={() => this.handleRemove('info', i)}
                        >
                         <Typography variant="caption">Clear</Typography> 
                  </ColorButton>
                </Paper>
              })
            : 
              null}
          </Grid >

            
          {this.state.messages.length !== 0 
            ? 
              <Toast messages={this.state.messages} single_message={this.state.errorToBeSentToChild} 
              /> 
            :
              null
          }

        </Grid>
      </div>
      )
    }
    
    render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    )
  }
}

export default withStyles(styles)(MessageList)