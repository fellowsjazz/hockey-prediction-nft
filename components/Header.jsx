import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {Flex} from "@chakra-ui/react"

export default function Header() {
  return (
    <Flex direction='row' justify="right" p={"1%"}>
      <ConnectButton accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }}/>
    </Flex>
  );
}
