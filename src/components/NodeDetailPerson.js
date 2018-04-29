import React from 'react';

export default class NodeDetailPerson extends React.PureComponent
{
  render()
  {
    return(
      <div className='nodePersonDetail'>
        <div className='personName'>{this.props.personName}</div>
        <div className='designation'>{this.props.designation}</div>
      </div>
    )
  }
}
