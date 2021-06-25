import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  content?: string;
  inverted?: boolean;
}

export default function ({ content = "loading...", inverted = true }: Props) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
