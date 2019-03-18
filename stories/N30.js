import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/N30/index.jsx";
import Game from "../src/N30/lib/N30.js";
import ReactGame from "react-gameboard/lib/component";
import Guide from "../src/N30/guide.jsx";

const N30 = ReactGame(Game);

storiesOf("N30", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => <Guide> </Guide>)
  .add("Dễ", () => (
    <N30 N={4}>
      <Board />
    </N30>
  ))
  .add("Trung bình", () => (
    <N30 N={6}>
      <Board />
    </N30>
  ))
  .add("Khó", () => (
    <N30 N={8}>
      <Board />
    </N30>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 1,
      min: 3,
      max: 13
    };
    return (
      <N30 N={number("Kích cỡ bảng", 6, options)}>
        <Board />
      </N30>
    );
  });
