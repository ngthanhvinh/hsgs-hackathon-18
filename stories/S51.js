import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S51/index.jsx";
import Game from "../src/S51/lib/S51.js";
import ReactGame from "react-gameboard/lib/component";
import Guide from "../src/S51/guide.jsx";

const S51 = ReactGame(Game);

storiesOf("S51", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => (
    <Guide> </Guide>
  ))
  .add("Dễ", () => (
    <S51 N={3} M={4}>
      <Board />
    </S51>
  ))
  .add("Trung bình", () => (
    <S51 N={4} M={5}>
      <Board />
    </S51>
  ))
  .add("Khó", () => (
    <S51 N={5} M={6}>
      <Board />
    </S51>
  ))
  .add("Tùy chọn", () => {
    const options = {
      range: true,
      step: 1,
      min: 1,
      max: 10
    };
    return (
      <S51 N={number("Hàng", 5, options)} M={number("Cột", 5, options)}>
        <Board />
      </S51>
    );
  });
