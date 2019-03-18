import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S01/index.jsx";
import Game from "../src/S01/lib/S01.js";
import ReactGame from "react-gameboard/lib/component";
import Guide from "../src/S01/guide.jsx";

const S01 = ReactGame(Game);

storiesOf("S01", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => <Guide> </Guide>)
  .add("Dễ", () => (
    <S01 N={4}>
      <Board />
    </S01>
  ))
  .add("Trung bình", () => (
    <S01 N={5}>
      <Board />
    </S01>
  ))
  .add("Khó", () => (
    <S01 N={7}>
      <Board />
    </S01>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 1,
      min: 1,
      max: 10
    };
    return (
      <S01 N={number("Kích cỡ bảng", 5, options)}>
        <Board />
      </S01>
    );
  });
