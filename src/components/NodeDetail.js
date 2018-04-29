import React from 'react';
import NodeDetailHeader from './NodeDetailHeader';
import NodeDetailPerson from './NodeDetailPerson';

export default class NodeDetail extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      'isOpened':props.details.isOpened,
      "styles":props.details.position
    };

    this.expandOrCollapse = this.expandOrCollapse.bind(this)
  }

  expandOrCollapse(event)
  {
    this.props.handleExpandOrCollapse(event,this.props.details.id);
  }

  static getDerivedStateFromProps(nextProps, prevState)
  {
    if(nextProps.details.isOpened!==prevState.isOpened)
    {
      return {isOpened:nextProps.details.isOpened}
    }
    else if((nextProps.details.position.top!==prevState.styles.top) || (nextProps.details.position.left!==prevState.styles.left) || (nextProps.details.position.position!==prevState.styles.position))
    {
      return {"styles":nextProps.details.position};
    }
    else
    {
      return null;
    }
  }

  render()
  {

    let classNameForMain = `nodeDetailContainer`;

    if(this.state.isOpened && this.props.details.childs)
    {
      classNameForMain = `${classNameForMain} down`;
    }

    if(this.props.details.level!=1)
    {
      classNameForMain = `${classNameForMain} up`;
    }

    return(
      <div style={this.state.styles} className={classNameForMain}>
        <NodeDetailHeader teamName={this.props.details.teamName} isOpened={this.state.isOpened} expandOrCollapse={this.expandOrCollapse} childs={this.props.details.childs}/>
        <div className='nodeBody'>
          <NodeDetailPerson personName={this.props.details.personName} designation={this.props.details.designation} />
          <div className='teamDetail'>
            <div className='personName'>{this.props.details.childs} person</div>
          </div>
        </div>
      </div>
    )
  }
}
