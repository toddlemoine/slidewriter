import React, { Component } from "react";
import { inject, observer } from "mobx-react";

function props({ hub }) {
  return {
    announcement: hub.announcement
  };
}

@inject(props)
@observer
class ATAnnouncements extends Component {
  render() {
    return (
      <div className="at-announcements visually-hidden" aria-live="polite">
        {this.props.announcement}
      </div>
    );
  }
}

export default ATAnnouncements;
