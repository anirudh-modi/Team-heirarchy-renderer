import React from 'react';

export default class AppHeader extends React.PureComponent
{
    render()
    {
        return (
            <div className="headerTitle">{this.props.title}</div>
        );
    }
}
