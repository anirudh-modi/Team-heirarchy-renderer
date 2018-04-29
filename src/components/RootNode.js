import React from 'react';
import NodeDetail from './NodeDetail';
import NodeChilds from './NodeChilds';
import {getUniqueId} from '../config/utility';

export default class RootNode extends React.Component
{
  constructor(props={node:{designation:'',teamName:'',personName:'',immediateEmployee:[],level:1}})
  {
    super(props);

    this.state = {
            id:getUniqueId(),
            teamName:props.node.teamName,
            personName:props.node.personName,
            designation:props.node.designation,
            immediateEmployee:props.node.immediateEmployee,
            level:props.node.level,
            hasChildNodes:false,
            'nodeDetailPosition':{
              top:0,
              left:0,
              position:'absolute'
            },
            'nodeChildPosition':{
              top:0,
              left:0,
              position:'absolute'
            },
            'linePosition':{
              left:0
            },
            'isOpened':false
        };

    if(props.node.immediateEmployee.length)
    {
      this.state.hasChildNodes = true;
    }

    this.elementRef = React.createRef();

    this.handleExpandOrCollapse = this.handleExpandOrCollapse.bind(this);
  }

  componentDidMount()
  {
    var element = this.elementRef.current;

    var NodeDetailElement = element.childNodes[0];

    var NodeChildElement = element.childNodes[1];

    var childRowWidth = 0;

    if(this.state.immediateEmployee.length>4)
    {
      childRowWidth = Math.floor((window.innerWidth-100)/270)*270+100;
    }
    else if((270*this.state.immediateEmployee.length) > window.innerWidth)
    {
      childRowWidth = Math.floor((window.innerWidth-100)/270)*270+100;
    }
    else
    {
      childRowWidth = 270*this.state.immediateEmployee.length;
    }

    let childLeft = (window.innerWidth - childRowWidth)/2;

    let udpatedState = {
      'nodeDetailPosition':
      {
        top:0,
        left:(window.innerWidth - 250)/2,
        position:'absolute'
      },
      'nodeChildPosition':
      {
        top:NodeDetailElement.offsetHeight+50,
        left:childLeft,
        'position':'absolute',
        'width':childRowWidth
      },
      'linePosition':{
        left:childLeft+125+10,
        top:NodeDetailElement.offsetHeight+40,
        width:271*(this.state.immediateEmployee.length-1)
      }
    };

    if(udpatedState.linePosition.width>811)
    {
      udpatedState.linePosition.width = 811;
      udpatedState.linePosition.left = 230;
    }

    this.setState(udpatedState);
  }

  handleExpandOrCollapse(e,r)
  {
    if(this.state.isOpened)
    {
      this.setState({
        'isOpened':false
      })
    }
    else
    {
      this.setState({
        'isOpened':true
      })
    }
  }

  render()
  {
    let nodeDetailObject = {
      'id':this.state.id,
      'teamName':this.state.teamName,
      'personName':this.state.personName,
      'designation':this.state.designation,
      'childs':this.state.immediateEmployee.length,
      'isOpened':this.state.isOpened,
      'position':this.state.nodeDetailPosition,
      'level':this.state.level
    };

    if(this.state.isOpened)
    {
      return(
        <div ref={this.elementRef} className='nodeContainer width100'>
          <NodeDetail details={nodeDetailObject} handleExpandOrCollapse={this.handleExpandOrCollapse}/>
          <div className='line' style={this.state.linePosition}></div>
          <NodeChilds childrens={this.state.immediateEmployee} position={this.state.nodeChildPosition}/>
        </div>
      );
    }
    else
    {
      return(
        <div ref={this.elementRef} className='nodeContainer width100'>
          <NodeDetail details={nodeDetailObject} handleExpandOrCollapse={this.handleExpandOrCollapse}/>
        </div>
      );
    }
  }
}
