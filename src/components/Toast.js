
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
      width: '100%',
      '& > * + *': {
          marginTop: '5px'
      },
    },
    snackbarStyleViaNestedContent: {
        marginTop: '1rem',
        backgroundColor: '#F56236',
        color: 'black',
    }
  });

const Toast = (props) => {
      
    var timeout
    const [open, setOpen] = useState(true)
    const {classes} = props
    const mounted = useRef()

    const action = (
          <Button 
          color='black' 
          size='small'
          onClick={() => {
              setOpen(false)
            }}
            >
              X
          </Button>
    ) 
      
    useEffect(() => {
        setOpen(true)
        if (!mounted.current) {
            mounted.current = true
        } 
        else {
            clearTimeout(timeout)
            timeout = setTimeout(function () {
              setOpen(false);
            }, 2000)
            console.log('update toast')
        }
        return() => {
            clearTimeout(timeout)
            setOpen(false)
            console.log('unmount toast')
          }
          
        }, [props.single_message])
        
        console.log(props.single_message)
        return(
            <div>
                    <Snackbar open={open} 
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                            <SnackbarContent aria-describedby="message-id2"
                                data-testid= 'snackbar'
                                className={classes.snackbarStyleViaNestedContent}
                                message={props.single_message[0]}
                                action={action}
                            />
                    </Snackbar>    
        </div>
    )
}


export default withStyles(styles)(Toast)
