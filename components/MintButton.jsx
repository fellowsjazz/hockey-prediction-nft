import React from "react";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import {usePrepareContractWrite, useContractWrite} from 'wagmi'

import NHLNFT from "../artifacts/contracts/NHLNFT.sol/NHLNFT.json";
import { ethers } from "ethers";

export default function MintButton(props) {

    const selection = props.selection
    const colorOne = props.colorOne
    const colorTwo = props.colorTwo
    const tip = toString(props.tip)

    console.log("Mint button received props: ", selection, colorOne,colorTwo, tip)

  const { config, error } = usePrepareContractWrite({
    addressOrName: "0xd8f3bAA53D4541547A81453911183Ccd0035C4F2",
    contractInterface: NHLNFT.abi,
    functionName: "mint",
    args: [selection,colorOne,colorTwo],
    overrides: {
        gasLimit: 500000,
    }
  });
  const { write } = useContractWrite(config);
  

  return (
    <Flex mt={"2rem"}>
      <Button disabled={!write} size={"lg"} onClick={() => write?.()}><Text fontSize={"200%"}>MINT 🏒</Text></Button>
    </Flex>
  );
}
