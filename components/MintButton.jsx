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

export default function MintButton(props) {

    const selection = props.selection
    const colorOne = props.colorOne
    const colorTwo = props.colorTwo

    console.log("Mint button received props: ", selection, colorOne,colorTwo)

  const { config, error } = usePrepareContractWrite({
    addressOrName: "0xe029d4EeD73C5Bc2aC367b6aa1d80c9Ae66be66A",
    contractInterface: NHLNFT.abi,
    functionName: "mint",
    args: [selection,colorOne,colorTwo],
    overrides: {
        gasLimit: 500000
    }
  });
  const { write } = useContractWrite(config);
  

  return (
    <Flex mt={"2rem"}>
      <Button disabled={!write} size={"lg"} onClick={() => write?.()}><Text fontSize={"200%"}>MINT 🏒</Text></Button>
    </Flex>
  );
}
