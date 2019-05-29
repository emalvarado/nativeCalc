/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullCalc: "",
      currentCalc: "",
      result: ""
    };
  }

  handleNumPress = value => {
    const calcText = this.state.currentCalc;

    switch (value) {
      case 0:
        if (calcText === "0") {
          return;
        }
        this.addValue(value);
        break;
      case ".":
        if (calcText.includes(".")) {
          return;
        }
        this.addValue(value);
        break;
      default:
        this.addValue(value);
    }
  };

  calculate = () => {
    const { fullCalc, currentCalc, result } = this.state;
    const fullCalcArr = fullCalc.split("");
    const runFunc = fullCalcArr.some(char => {
      return char === "+" || char === "-" || char === "/" || char === "*";
    });
    if (runFunc) {
      this.handleResult();
    }
  };

  handleOperatorPress = async operator => {
    let value = operator;
    calcText = this.state.currentCalc;
    const lastChar = calcText[calcText.length - 1];

    switch (lastChar) {
      case "/":
      case "*":
      case "+":
      case "-":
        let newCalc = calcText.split("");
        newCalc.pop();
        this.setState({
          fullCalc: newCalc.join("") + value
        });
        break;
    }
    switch (operator) {
      case "÷":
        value = "/";
        await this.addToFinal();
        await this.handleResult();
        this.addValue(value);
        break;
      case "×":
        value = "*";
        await this.addToFinal();
        await this.handleResult();
        this.addValue(value);
        break;
      case "=":
        switch (lastChar) {
          case "+":
          case "-":
          case "*":
          case "/":
            break;
          default:
            await this.addToFinal();
            await this.handleResult();
            this.clearCalc();
        }

        break;
      default:
        await this.addToFinal();
        await this.handleResult();
        this.addValue(value);
    }
  };

  handleOptionPress = value => {};

  addValue = value => {
    let newVal = this.state.currentCalc + value;
    this.setState({
      currentCalc: newVal
    });
  };

  addToFinal = () => {
    const { fullCalc, currentCalc } = this.state;
    const calcToAdd = fullCalc ? fullCalc + currentCalc : currentCalc;
    this.setState({
      currentCalc: "",
      fullCalc: calcToAdd
    });
  };

  clearCalc = () => {
    this.setState({
      fullCalc: "",
      currentCalc: ""
    });
  };

  handleResult = () => {
    const result = eval(this.state.fullCalc);
    this.setState({
      result
    });
  };

  render() {
    const numbers = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, "."]].map(
      (row, i) => {
        return (
          <View style={styles.btnRow} key={i}>
            {row.map(value => {
              return (
                <Button
                  key={value}
                  innerText={value}
                  style={
                    value === 0
                      ? [styles.zero, styles.btn]
                      : [styles.numbers, styles.btn]
                  }
                  textStyle={styles.btnText}
                  fn={() => this.handleNumPress(value)}
                />
              );
            })}
          </View>
        );
      }
    );

    const options = ["AC", "DEL", "%"].map(value => {
      return (
        <Button
          key={value}
          innerText={value}
          style={[styles.btn, styles.optionBtn]}
          textStyle={[styles.btnText, styles.optionBtnText]}
          fn={() => this.handleOptionPress(value)}
        />
      );
    });

    const operations = ["÷", "×", "-", "+", "="].map(value => {
      return (
        <Button
          key={value}
          innerText={value}
          style={[styles.btn, styles.operation]}
          textStyle={[styles.btnText, styles.operationText]}
          fn={() => this.handleOperatorPress(value)}
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.calcContainer}>
          <View style={styles.calculation}>
            <Text style={styles.calculationText}>
              {this.state.fullCalc}
              {this.state.currentCalc}
            </Text>
          </View>
          <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.result}</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.mainBtns}>
            <View style={[styles.btnRow]}>{options}</View>
            {numbers}
          </View>
          <View style={styles.operationBtns}>{operations}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#D2D4D6",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6d6d6d"
  },
  btnContainer: {
    flex: 7,
    flexDirection: "row"
  },

  btnRow: {
    flexDirection: "row",
    flex: 1
  },
  btnText: {
    fontSize: 35,
    fontWeight: "300"
  },
  calcContainer: {
    flex: 3
  },
  calculation: {
    flex: 3,
    backgroundColor: "#2b2b2b",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  calculationText: {
    color: "white",
    fontSize: 25
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  mainBtns: {
    flex: 3,
    backgroundColor: "gray"
  },
  numbers: {
    flex: 1
  },
  operationBtns: {
    flex: 1
  },
  operation: {
    backgroundColor: "orange",
    flex: 1
  },
  operationText: {
    color: "white"
  },
  optionBtn: {
    flex: 1,
    backgroundColor: "#b7b7b7"
  },
  optionBtnText: {
    color: "#444444"
  },
  result: {
    flex: 4,
    backgroundColor: "#232323",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  resultText: {
    color: "white",
    fontSize: 50
  },
  zero: {
    flex: 2
  }
});
