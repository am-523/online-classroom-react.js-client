import React from 'react';
// import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, CardHeader, Divider, Grid} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {Rnd} from 'react-rnd'
import {connection as conn} from '../../interface/connection'

const styles = theme => ({
    card: {
        width: 450,
        height: 550
    },
    griditems: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    newitems: {
        display: 'flex',
    },
    infodiv: {
        padding: '10px'
    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      },
      infolist: {
          width: 450,
          height: 150
      }
});

class Drawer extends React.Component {
    state = {
        // files: [{name: "file1.pdf", time: "4/2/2019 15:01"}, {name: "file2.jpg", time: "4/2/2019 15:30"}],
        files: [],
        dense: false,
    }
    
    async componentDidMount() {
        const response = await conn.call("get_filenames_in_drawer")
        if (response.result) this.setState({files: response.result})
        conn.addListener('drawer_item_change', this.handleDrawerChange)
    }

    handleDrawerChange = e => {
        this.setState({files: e.result})
    }

    render() {
        const {classes} = this.props;
        const { dense } = this.state;
        return (
            <Rnd 
                style={{zIndex: this.props.zIndex}} 
                onMouseDown={() => this.props.bringTop()}
                onDragStart={() => this.props.bringTop()}
                bounds="window"
                enableResizing={false}
                default={{
                    x: this.props.position.x, 
                    y: this.props.position.y, 
            }}>
                <Card className={classes.card}>
                <CardHeader //this height is 74px
                    title= "Personal Drawer"
                />
                    <Divider/>
                    <Grid 
                        container 
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >
                        
                        {/* {this.state.files.map(file => 
                            <Grid item className={classes.griditems}>
                            <div className={classes.infodiv}>
                                <text>{file.name}</text>
                            </div>
                            <div className={classes.infodiv}>
                                <text>{file.time}</text>
                            </div>
                                <div className={classes.infodiv}>
                                    <button>View</button>
                                    <button>Delete</button>
                                    <button>Share</button>
                                </div>
                            </Grid>
                        )}
                        <Grid item className={classes.newitem}>
                            <div className={classes.infodiv}>
                                <button> + </button>
                                <text>Upload/Drag</text>
                            </div>
                        </Grid> */}

                        <Grid item xs={12} md={6}>
                            <div className={classes.demo}>
                            <List dense={dense} className={classes.infolist}>
                                {this.state.files.map(filename => 
                                <ListItem key={filename.name}>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={filename}
                                    />
                                    <ListItemText
                                        primary={"some more info here"}
                                    />
                                    <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                )}
                            </List>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Rnd>
        )
    }
}

export default withStyles(styles)(Drawer)