import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "login.ftl",
});

const meta = {
  title: "login-v4/Login",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />,
};

export const WithoutPasswordReset: Story = {
  render: () => (
    <PageStory kcContext={{ realm: { resetPasswordAllowed: false } }} />
  ),
};

export const WithEmailAsUsername: Story = {
  render: () => (
    <PageStory kcContext={{ realm: { loginWithEmailAllowed: false } }} />
  ),
};
