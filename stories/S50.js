import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S50/index.jsx";
import Game from "../src/S50/lib/S50.js";
import ReactGame from "react-gameboard/lib/component";
import Guide from "../src/S50/guide.jsx";

const S50 = ReactGame(Game);

storiesOf("S50", module)
  .addDecorator(withKnobs)
  .add("Hướng dẫn", () => (
    <Guide> </Guide>
  ))
  .add("Dễ", () => (
    <S50 N={4} M={6}>
      <Board />
    </S50>
  ))
  .add("Trung bình", () => (
    <S50 N={6} M={8}>
      <Board />
    </S50>
  ))
  .add("Khó", () => (
    <S50 N={10} M={8}>
      <Board />
    </S50>
  ))
  .add("Tùy chọn", () => {
    const optionsRow = {
      range: true,
      step: 4,
      min: 4,
      max: 12
    };
    const optionsCol = {
      range: true,
      step: 2,
      min: 2,
      max: 8,
    };
    return (
      <S50 N={number("Hàng", 4, optionsRow)} M={number("Cột", 2, optionsCol)}>
        <Board />
      </S50>
    );
  });
