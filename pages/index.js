import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import {Image, Flex, Center} from "@chakra-ui/react"
import PredictionCreate from '../components/PredictionCreate'

export default function Home() {
  return (
    <Flex direction="column" bg={"blue.100"} >
      <Header/>
      <Flex justify={"center"}>
      <Image src='/CupPick.svg' boxSize="33%" borderRadius={'5%'}/>
      </Flex>
      
      
      <PredictionCreate/>
    </Flex>
  )
}
