import React from 'react';
import RootNode from './RootNode';

export default class AppBody extends React.Component
{
  render()
    {
      return (
        <div>
          <RootNode node={this.props.rootNode} />
        </div>
      );
    }
}
