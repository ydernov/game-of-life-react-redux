import { ComponentMeta, ComponentStory } from "@storybook/react";
import Cell from "../components/Cell";

export default {
  title: "Cell",
  component: Cell,
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Alive = Template.bind({});
Alive.args = {
  size: 30,
  alive: true,
};

export const AliveNewborn = Template.bind({});
AliveNewborn.args = {
  size: 30,
  alive: true,
  newBorn: true,
};

export const Dead = Template.bind({});

Dead.args = {
  size: 30,
  alive: false,
};
