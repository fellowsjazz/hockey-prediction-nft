import { ReactComponentElement, useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  Select,
  Button,
  Heading,
} from "@chakra-ui/react";
import DisplaySvg from "./DisplaySvg";
import { useAccount } from "wagmi";
import MintButton from "./MintButton";
import { BiInfoCircle } from "react-icons/bi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import "@fontsource/viga/400.css";

//NEXT STEP IS TO get address info from rainbowkit/wagmi, and populate the rest of the svg text

export default function PredictionCreate() {
  const [selectedTeam, setSelectedTeam] = useState("ANA");
  const [selectedTeamInfo, setSelectedTeamInfo] = useState([]);
  const [tip, setTip] = useState(0);
  const { address, isConnecting, isDisconnected } = useAccount();

  const format = (val) => `$` + val
  const parse = (val) => val.replace(/^\$/, '')

  const teamInfo = {
    ANA: ["#F47A38", "#B9975B", "Anaheim Ducks"],
    ARI: ["#8C2633", "#E2D6B5", "Arizona Coyotes"],
    BOS: ["#FFB81C", "#000000", "Boston Bruins"],
    BUF: ["#003087", "#FFB81C", "Buffalo Sabres"],
    CAR: ["#CE1126", "#A4A9AD", "Carolina Huricanes"],
    CGY: ["#D2001C", "#FAAF19", "Calgary Flames"],
    CBJ: ["#002654", "#CE1126", "Columbus Blue Jackets"],
    CHI: ["#CF0A2C", "#000000", "Chicago Blackhawks"],
    COL: ["#6F263D", "#236192", "Colorado Avalanche"],
    DAL: ["#006847", "#8F8F8C", "Dallas Stars"],
    DET: ["#CE1126", "#FFFFFF", "Detroit Red Wings"],
    EDM: ["#041E42", "#FF4C00", "Edmonton Oilers"],
    FLA: ["#041E42", "#C8102E", "Florida Panthers"],
    LAK: ["#111111", "#A2AAAD", "Los Angeles Kings"],
    MIN: ["#154734", "#A6192E", "Minnesota Wild"],
    MTL: ["#AF1E2D", "#192168", "Montreal Canadiens"],
    NSH: ["#FFB81C", "#041E42", "Nashville Predators"],
    NJD: ["#CE1126", "#000000", "New Jersey Devils"],
    NYI: ["#F47D30", "#00539B,", "New York Islanders"],
    NYR: ["#0038A8", "#CE1126", "New York Rangers"],
    OTT: ["#DA1A32", "#B79257", "Ottawa Senators"],
    PHI: ["#F74902", "#000000", "Philadelphia Flyers"],
    PIT: ["#FCB514", "#000000", "Pittsburgh Penguins"],
    STL: ["#002F87", "#FCB514", "St.Louis Blues"],
    SJS: ["#006D75", "#EA7200", "San Jose Sharks"],
    SEA: ["#99D9D9", "#001628", "Seattle Kraken"],
    TBL: ["#002868", "#FFFFFF", "Tampa Bay Lightning"],
    TOR: ["#00205B", "#FFFFFF", "Toronto Maple Leafs"],
    VAN: ["#00843D", "#00205B", "Vancouver Canucks"],
    VGK: ["#B4975A", "#333F42", "Vegas Golden Knights"],
    WSH: ["#041E42", "#C8102E", "Washington Capitals"],
    WPG: ["#041E42", "#004C97", "Winnepeg Jets"],
  };

  const abbrArray = Object.keys(teamInfo);

  useEffect(() => {
    if (selectedTeam) {
      console.log("selected team: ", selectedTeam);
      console.log("selected team info: ", teamInfo[selectedTeam]);
      setSelectedTeamInfo(teamInfo[selectedTeamInfo]);
    }
  }, []);

  const selectHandler = (e) => {
    console.log("from handler: ", e.target.value);
    setSelectedTeam(e.target.value);
  };

  return (
    <Flex direction={"column"} alignItems="center" mb={"10%"}>
      <Flex direction={"row"} py="1%">
        <Center>
          <Text fontSize={"xl"}>Mint Your Cup Pick</Text>
        </Center>
        <Popover>
          <PopoverTrigger>
            <IconButton variant={"link"} icon={<BiInfoCircle />} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>🏒 Cup Pick 🏒</PopoverHeader>
            <PopoverBody>
              Cup Pick is an on-chain NFT project that generates a unique
              collectible, incorporating your Ethereum address, your selected
              Stanley Cup Champion prediction, and the date the prediction was
              made!
              <br />
              <br />
              Lock in your selection now for ultimate bragging rights!
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Flex direction="column" align="center" w={"50%"} minW="300px" m={"1rem"}>
        <Text fontSize={"lg"} mb="5%">
          Which team do you think will win???
        </Text>

        <Select variant="filled" onChange={(e) => selectHandler(e)}>
          {abbrArray.map((v) => {
            return <option value={v}>{teamInfo[v][2]}</option>;
          })}
        </Select>
        <MintButton
          selection={teamInfo[selectedTeam][2]}
          colorOne={teamInfo[selectedTeam][0]}
          colorTwo={teamInfo[selectedTeam][1]}
          tip={tip}
        />
      </Flex>

      <Box boxSize={"50%"} m="1rem">
        <Center>
          <Text as={"i"}>(Preview of your NFT)</Text>
        </Center>
        <DisplaySvg
          teamAbbr={selectedTeam}
          teamInfo={teamInfo[selectedTeam]}
          address={address}
          
        />
        <Center>
          <Text as={"i"}>(Preview of your NFT)</Text>
        </Center>
      </Box>

{/* <Text my={"4rem"} as={'i'}>Cup Pick NFTs are entirely free to mint, but if you want to support future development of projects like this, feel free to add a tip below before minting! :)</Text>
      <NumberInput defaultValue={0} step={0.0025} min={0} onChange={(v) => {setTip(format(v)); console.log("tip value: ",v)}}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text as={'i'}>tips valued in ether</Text> */}
    </Flex>
  );
}
