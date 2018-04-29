import React from 'react';

export default class NodeDetailHeader extends React.Component
{
  render()
  {
    var classNameForHeader = `nodeHeader`;

    if(this.props.isOpened)
    {
      classNameForHeader = `${classNameForHeader} nodeHeaderWithChild`
    }

    // If the node dodesnt have any child then there needs to be no expanded
    // collapse icon, just the name is sufficient
    if(this.props.childs)
    {
      // This is to show whether the current node is expanded or collpased
      if(this.props.isOpened)
      {
          var  expandState = <button className='expand' onClick={(e)=>{this.props.expandOrCollapse(e)}}>-</button>
      }
      else
      {
        var expandState = <button className='expand' onClick={(e)=>{this.props.expandOrCollapse(e)}}>+</button>
      }
      return(
        <div className={classNameForHeader}>
          {this.props.teamName}
          {expandState}
        </div>
      )
    }
    else
    {
      return(
        <div className={classNameForHeader}>
          {this.props.teamName}
        </div>
      )
    }
  }
}
