import React from 'react';
import NodeDetail from './NodeDetail';
import NodeChilds from './NodeChilds';
import {getUniqueId} from '../config/utility';

export default class Node extends React.Component
{
  constructor(props={node:{designation:'',teamName:'',personName:'',immediateEmployee:[],level:2}})
  {
    super(props);

    this.state = {
            'id':props.node.id||getUniqueId(),
            'teamName':props.node.teamName,
            'personName':props.node.personName,
            'designation':props.node.designation,
            'immediateEmployee':props.node.immediateEmployee,
            'level':props.node.level,
            'hasChildNodes':false,
            'indexInOriginalArray':props.node.indexInOriginalArray,
            'indexInVisibleArray':props.indexInVisibleArray,
            'nodeDetailPosition':{
              'top':0,
              'left':0,
              'position':'absolute'
            },
            'nodeChildPosition':{
              'top':0,
              'left':0,
              'position':'absolute'
            },
            'linePosition':{
              'left':0
            },
            'isOpened':false
        };

    if(props.node.immediateEmployee.length)
    {
      this.state.hasChildNodes = true;
    }

    if(props.openedItem===this.state.id)
    {
      this.isOpened = true;
    }

    this.elementRef = React.createRef();

    this.computeNewPosition = this.computeNewPosition.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState)
  {
    if(nextProps.openedItem!==prevState.id)
    {
      return {isOpened:false,indexInVisibleArray:nextProps.indexInVisibleArray};
    }
    else if(nextProps.openedItem===prevState.id)
    {
      return {isOpened:true,indexInVisibleArray:nextProps.indexInVisibleArray};
    }
    else if(nextProps.indexInVisibleArray!==prevState.indexInVisibleArray)
    {
      return {indexInVisibleArray:nextProps.indexInVisibleArray};
    }
    else
    {
      return null;
    }
  }

  computeNewPosition(setStateTo)
  {
    let childRowWidth = 0;

    var element = this.elementRef.current;

    var NodeDetailElement = element.childNodes[0];

    var NodeChildElement = element.childNodes[1];

    if(this.state.immediateEmployee.length>4)
    {
      childRowWidth = Math.floor((window.innerWidth-100)/270)*270 +100;
    }
    else if((300*this.state.immediateEmployee.length) > window.innerWidth)
    {
      childRowWidth = Math.floor((window.innerWidth-100)/270)*270;
    }
    else
    {
      childRowWidth = 270*this.state.immediateEmployee.length;
    }

    let childLeft = this.state.indexInVisibleArray*270+45;

    if((childLeft+childRowWidth)>window.innerWidth)
    {
      if(this.state.immediateEmployee.length>=4)
      {
        childLeft = 0;
      }
      else if((childLeft)>window.innerWidth/2)
      {
        childLeft = childLeft - (childLeft-(window.innerWidth/2));
      }
      else
      {
        childLeft = 0
      }
    }

    let lineWidth = 270*(this.state.immediateEmployee.length-1);
    let lineLeft = childLeft+125+10;

    if(lineWidth>811)
    {
      lineWidth = 811;
      lineLeft = lineLeft + 45;
      //udpatedState.linePosition.left = 230;
    }

    let stateDet = {
      'nodeDetailPosition':
      {
        // top:element.offsetHeight,
        // left:(window.innerWidth - 280)/2,
        position:'relative'
      },
      'nodeChildPosition':
      {
        top:NodeDetailElement.offsetHeight+50,
        left:childLeft,
        'position':'absolute',
        'width':childRowWidth
      },
      'linePosition':{
        left:lineLeft,
        width:lineWidth
      }
    };

    return stateDet;

  }

  componentDidMount()
  {
    this.setState(this.computeNewPosition());
  }

  render()
  {
    var posDet = {
      'nodeDetailPosition':this.state.nodeDetailPosition,
      'nodeChildPosition':this.state.nodeChildPosition,
      'linePosition':this.state.linePosition,
    };

    if(this.elementRef && this.elementRef.current)
    {
      posDet = this.computeNewPosition();
    }

    let nodeDetailObject = {
      'id':this.state.id,
      'teamName':this.state.teamName,
      'personName':this.state.personName,
      'designation':this.state.designation,
      'childs':this.state.immediateEmployee.length,
      'isOpened':this.state.isOpened,
      'position':posDet.nodeDetailPosition,
      'level':this.state.level
    };

    // If the current node detail is expanded
    // then there is no reason to render the childrens
    // present under the given node.
    if(this.state.isOpened)
    {
      return(
        <div ref={this.elementRef} className='nodeContainer'>
          <NodeDetail details={nodeDetailObject} handleExpandOrCollapse={this.props.handleExpandOrCollapse}/>
          <div className='line' style={posDet.linePosition}></div>
          <NodeChilds childrens={this.state.immediateEmployee} position={posDet.nodeChildPosition}/>
        </div>
      );
    }
    else
    {
      return(
        <div ref={this.elementRef} className='nodeContainer'>
          <NodeDetail details={nodeDetailObject} handleExpandOrCollapse={this.props.handleExpandOrCollapse}/>
        </div>
      );
    }
  }
}
