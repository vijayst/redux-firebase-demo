import React from 'react';

export default class Invite extends React.Component {

  componentDidMount() {
    this.props.onGetInvite();
  }

  render() {
    const { host, agenda, guest_count } = this.props.invite;
    return (
      <div className="container">
        <div className="well">
          <h1>Meeting invite</h1>
        </div>
        <div>
          {host}
          {agenda}
          {guest_count}
        </div>
      </div>
    );
  }
}
