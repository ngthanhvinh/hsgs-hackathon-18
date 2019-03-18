import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/N31/index.jsx";
import Game from "../src/N31/lib/N31.js";
import ReactGame from "react-gameboard/lib/component";
import Guide from "../src/N31/guide.jsx";

const N31 = ReactGame(Game);

storiesOf("N31", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => (
    <Guide> </Guide>
  ))
  .add("Dễ", () => (
    <N31 N={4}>
      <Board/>  
    </N31>
  ))
  .add("Trung bình", () => (
    <N31 N={6}>
      <Board/>  
    </N31>
  ))
  .add("Khó", () => (
    <N31 N={8}>
      <Board/>  
    </N31>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 2,
      min: 4,
      max: 10
    };
    return (
      <N31 N={number("Kích cỡ bảng", 6, options)}>
        <Board />
      </N31>
    );
  });
