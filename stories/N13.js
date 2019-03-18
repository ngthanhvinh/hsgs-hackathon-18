import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/N13/index.jsx";
import Game from "../src/N13/lib/N13.js";
import ReactGame from "react-gameboard/lib/component";
import Guide from "../src/N13/guide.jsx";

const N13 = ReactGame(Game);

storiesOf("N13", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => (
    <Guide> </Guide>
  ))
  .add("Dễ", () => (
    <N13 N={5}>
      <Board/>  
    </N13>
  ))
  .add("Trung bình", () => (
    <N13 N={7}>
      <Board/>  
    </N13>
  ))
  .add("Khó", () => (
    <N13 N={12}>
      <Board/>  
    </N13>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 1,
      min: 4,
      max: 13
    };
    return (
      <N13 N={number("Kích cỡ bảng", 6, options)}>
        <Board />
      </N13>
    );
  });
