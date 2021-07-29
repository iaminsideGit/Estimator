import React from "react";
import PropTypes from "prop-types";

export default class WrapperFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  };
  static defaultProps = {
    value: 0
  };
  /**
   *
   * @returns {*}
   */
  render() {
    return (
      <p style={{ whiteSpace: "normal" }}>
        <p>{this.props.value}</p>
      </p>
    );
  }
}
