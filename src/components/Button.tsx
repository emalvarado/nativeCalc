import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.fn} style={this.props.style}>
        <Text style={this.props.textStyle}>{this.props.innerText}</Text>
      </TouchableOpacity>
    );
  }
}
