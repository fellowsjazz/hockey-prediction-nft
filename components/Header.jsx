import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {Flex, Text, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,} from "@chakra-ui/react"

export default function Header() {
  return (
    <Flex direction='row' justify="space-between" p={"1%"} align="center">

      <Flex>
        <a href={"https://opensea.io/collection/nhl-predictions"} target={"_blank"} rel="noreferrer"><Text mr={"1rem"}>Opensea</Text></a>
        <a href={"https://etherscan.io/address/0xd8f3baa53d4541547a81453911183ccd0035c4f2"} target={"_blank"} rel="noreferrer"><Text mr={"1rem"}>Contract</Text></a>
        <Popover>
          <PopoverTrigger>
          <Text>How it's Made</Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>🏒 Cup Pick 🏒</PopoverHeader>
            <PopoverBody>
              Cup Pick is a unique NFT project because all elements of the collection are on-chain! But what does that mean??
              <br/><br/>
              Normally, NFTs are &#34;pointers&#34; to content, like images, videos, audio, and metadata (i.e. the data that tells NFT websites like opensea all kinds of info), that are stored in a different location, like a webserver, cloud database, or decentralized storage like IPFS!
              <br/><br/>
              Cup Pick is different, because it doesn't use ANY outside storage providers - everything is stored on the block chain!
              <br/><br/>
              That means that once a &#34;Cup Pick Prediction&#34; is minted, its attributes (like team selection, prediction date, and minter address) can never be changed!
              <br/><br/>
              This is perfect, because the whole point of Cup Pick is to have verifiable proof that you predicted (on a certain date) that your team would win the Stanley Cup!
              
            </PopoverBody>
            </PopoverContent>
        </Popover>
        
      </Flex>
      <ConnectButton accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }}/>
    </Flex>
  );
}
