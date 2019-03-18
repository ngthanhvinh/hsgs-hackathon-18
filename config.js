import { configure } from "@storybook/react";

// Load all stories in the "stories" folder.
const req = require.context("./stories", true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
