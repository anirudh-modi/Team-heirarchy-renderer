import React from 'react';
import Node from './Node';
import {getUniqueId} from '../config/utility';

export default class NodeChilds extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      'openedItem':null,
      "styles":props.position,
      'children':props.childrens,
      'visibleChildren':[],
      'index':0,
      'showNav':false
    };

    this.state.children.forEach((child,index) => {child.id=getUniqueId();child.indexInOriginalArray=index});

    let len = this.state.children.length;

    if(this.state.children.length>4)
    {
      this.state.showNav = true;

      len = 4;
    }

    for(var i=0;i<len;i++)
    {
      this.state.visibleChildren.push(this.state.children[i]);
    }

    this.handleExpandOrCollapse = this.handleExpandOrCollapse.bind(this);

    this.navigateLeft = this.navigateLeft.bind(this);

    this.navigateRight = this.navigateRight.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState)
  {
    if((nextProps.position.top!==prevState.styles.top) || (nextProps.position.left!==prevState.styles.left) || (nextProps.position.position!==prevState.styles.position))
    {
      return {"styles":nextProps.position};
    }

    return null;
  }

  // When a sibling is expanded or collapsed
  // other sibling if opened needs to be closed so
  // that the new sibling can be opened, for this reason
  // the state of the entire sibling family needs to be lifted
  // up to the container which stores the state of the current sibling
  // being opened
  handleExpandOrCollapse(e,r)
  {
    if(this.state.openedItem==r)
    {
      this.setState({
        openedItem:null
      })
    }
    else
    {
      this.setState({
        openedItem:r
      })
    }
  }

  // By default we can only render 4 elements, so to do that we maintain
  // visible children array which consists of the children which is currently
  // visible
  getListOfChildrenToRender(childList)
  {
      let list = [];

      if(childList.length)
      {
        list = childList.map((child,index) => {
          return <Node handleExpandOrCollapse={this.handleExpandOrCollapse} openedItem={this.state.openedItem} key={child.id} node={child} indexInVisibleArray={index}/>
        });

        return list;
      }
      else
      {
        return null;
      }
  }

  navigateLeft()
  {
    if((this.state.index)>0)
    {
      var visibleChildren = [];

      let dontResetOpenedItem = false;

      for(var i=(this.state.index-1);i<(this.state.index-1+4);i++)
      {
        if(this.state.openedItem===this.state.children[i].id)
        {
          dontResetOpenedItem = true;
        }

        visibleChildren.push(this.state.children[i]);
      }

      if(dontResetOpenedItem)
      {
        this.setState({
          'index':this.state.index-1,
          'visibleChildren':visibleChildren
        });
      }
      else
      {
        this.setState({
          'index':this.state.index-1,
          'visibleChildren':visibleChildren,
          'openedItem':null
        });
      }
    }
  }

  navigateRight()
  {
    if((this.state.index+4)!=this.state.children.length)
    {
      var visibleChildren = [];

      let dontResetOpenedItem = false;

      for(var i=(this.state.index+1);i<(this.state.index+1+4);i++)
      {
        if(this.state.openedItem===this.state.children[i].id)
        {
          dontResetOpenedItem = true;
        }

        visibleChildren.push(this.state.children[i]);
      }

      if(dontResetOpenedItem)
      {
        this.setState({
          'index':this.state.index+1,
          'visibleChildren':visibleChildren
        });
      }
      else
      {
        this.setState({
          'index':this.state.index+1,
          'visibleChildren':visibleChildren,
          'openedItem':null
        });
      }
    }
  }

  render()
  {
    if(this.state.showNav)
    {
      let classForRightArrow='arrow',classForLeftArrow='arrow';

      if((this.state.index+4)===this.state.children.length)
      {
        classForRightArrow = classForRightArrow + ' disable';
      }

      if(this.state.index===0)
      {
        classForLeftArrow = classForLeftArrow + ' disable';
      }
      return(
        <div style={this.state.styles} className='nodeChildContainer'>
          <button onClick={this.navigateLeft} className={classForLeftArrow}>{`<`}</button>
          {this.getListOfChildrenToRender(this.state.visibleChildren)}
          <button onClick={this.navigateRight} className={classForRightArrow}>{`>`}</button>
        </div>
      )
    }
    else
    {
      return(
        <div style={this.state.styles} className='nodeChildContainer'>{this.getListOfChildrenToRender(this.state.visibleChildren)}</div>
      )
    }
  }
}
