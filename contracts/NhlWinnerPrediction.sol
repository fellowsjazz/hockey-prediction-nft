pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";
import "./DateTimeLibrary.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NhlWinnerPrediction is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string[] public wordValues = [
        "Toronto Maple Leafs",
        "Boston Bruins",
        "New York Rangers",
        "Montreal Canadians"
    ];
    mapping(string => string[]) public teamInfo;

    struct Prediction {
        string name;
        string description;
        string selection;
        uint256 predictor;
        uint256 date;
    }

    mapping(uint256 => Prediction) public predictions;

    constructor() ERC721("Hockey Predictions", "HP") {
        teamInfo["ANA"] = ["#F47A38", "Anaheim Ducks"];
        teamInfo["ARI"] = ["#8C2633", "Arizona Coyotes"];
        teamInfo["BOS"] = ["#FFB81C", "Boston Bruins"];
        teamInfo["BUF"] = ["#003087", "Buffalo Sabres"];
        teamInfo["CAR"] = ["#CE1126", "Carolina Huricanes"];
        teamInfo["CGY"] = ["#D2001C", "Calgary Flames"];
        teamInfo["CBJ"] = ["#002654", "Columbus Blue Jackets"];
        teamInfo["CHI"] = ["#CF0A2C", "Chicago Blackhawks"];
        teamInfo["COL"] = ["#6F263D", "Colorado Avalanche"];
        teamInfo["DAL"] = ["#006847", "Dallas Stars"];
        teamInfo["DET"] = ["#CE1126", "Detroit Red Wings"];
        teamInfo["EDM"] = ["#041E42", "Edmonton Oilers"];
        teamInfo["FLA"] = ["#041E42", "Florida Panthers"];
        teamInfo["LAK"] = ["#111111", "Los Angeles Kings"];
        teamInfo["MIN"] = ["#154734", "Minnesota Wild"];
        teamInfo["MTL"] = ["#AF1E2D", "Montreal Canadiens"];
        teamInfo["NSH"] = ["#FFB81C", "Nashville Predators"];
        teamInfo["NJD"] = ["#CE1126", "New Jersey Devils"];
        teamInfo["NYI"] = ["#F47D30", "New York Islanders"];
        teamInfo["NYR"] = ["#0038A8", "New York Rangers"];
        teamInfo["OTT"] = ["#DA1A32", "Ottawa Senators"];
        teamInfo["PHI"] = ["#F74902", "Philadelphia Flyers"];
        teamInfo["PIT"] = ["#FCB514", "Pittsburgh Penguins"];
        teamInfo["STL"] = ["#002F87", "St.Louis Blues"];
        teamInfo["SJS"] = ["#006D75", "San Jose Sharks"];
        teamInfo["SEA"] = ["#99D9D9", "Seattle Kraken"];
        teamInfo["TBL"] = ["#002868", "Tampa Bay Lightning"];
        teamInfo["TOR"] = ["#00205B", "Toronto Maple Leafs"];
        teamInfo["VAN"] = ["#00843D", "Vancouver Canucks"];
        teamInfo["VGK"] = ["#B4975A", "Vegas Golden Knights"];
        teamInfo["WSH"] = ["#041E42", "Washington Capitals"];
        teamInfo["WPG"] = ["#041E42", "Winnepeg Jets"];
    }

    // public
    function mint(string calldata selection) public payable {
        uint256 supply = totalSupply();
        require(supply + 1 <= 1000);

        Prediction memory newPrediction = Prediction(
            string(
                abi.encodePacked(
                    "Hockey Prediction #",
                    uint256(supply + 1).toString()
                )
            ),
            "This is a prediction for the 2022-2023 Stanley Cup",
            selection,
            uint256(uint160(msg.sender)),
            block.timestamp
        );

        if (msg.sender != owner()) {
            require(msg.value >= 0.005 ether);
        }

        predictions[supply + 1] = newPrediction;

        _safeMint(msg.sender, supply + 1);
    }

    function randomNum(
        uint256 _mod,
        uint256 _seed,
        uint256 _salt
    ) public view returns (uint256) {
        uint256 num = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, _seed, _salt)
            )
        ) % _mod;
        return num;
    }

    function buildImage(uint256 _tokenId) public view returns (string memory) {
        Prediction memory currentPrediction = predictions[_tokenId];
        (uint256 year, uint256 month, uint256 day) = DateTimeLibrary
            .timestampToDate(currentPrediction.date);

        return
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg width="500" height="500" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">',
                        '<rect style="fill:',
                        teamInfo[currentPrediction.selection][0],
                        '" width="139.8475" height="137.69232" x="-3.3525085" y="-2.394649" />',
                        '<text style="font-size:6.35px;fill:#ffffff" x="20.354517" y="17.720402" transform="translate(26.629765,-3.5919735)">Prediction #',
                        _tokenId.toString(),
                        "</text> ",
                        '<text style="font-size:6.35px; fill:#ffffff" x="20.354517" y="17.720402" transform="translate(-14.724085,11.463864)">Selection: </text>',
                        '<text style="font-size:6.35px; fill:#ffffff" x="20.354517" y="17.720402" transform="translate(-15.469167,19.366206)">',
                        teamInfo[currentPrediction.selection][1],
                        "</text>",
                        '<text style="font-size:6.35px;fill:#ffffff" x="20.354517" y="17.720402" transform="translate(-15.17378,32.297309)">Predictor: </text>',
                        '<text style="font-size:3.52778px;fill:#ffffff" x="20.354517" y="17.720402" id="text4280-0-2" transform="translate(-14.990237,39.720721)">',
                        Strings.toHexString(currentPrediction.predictor),
                        "</text>",
                        '<text xml:space="preserve" style="font-size:6.35px;fill:#ffffff;" x="20.354517" y="17.720402" transform="translate(-15.415515,52.651826)">Timestamp:</text>',
                        '<text xml:space="preserve" style="font-size:6.35px;fill:#ffffff" x="20.354517" y="17.720402" transform="translate(-14.283247,65.143367)">',
                        month.toString(),
                        "-",
                        day.toString(),
                        "-",
                        year.toString(),
                        "</text>",
                        "</svg>"
                    )
                )
            );
    }

    function getFullName(string memory _abbr)
        public
        view
        returns (string memory)
    {}

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        Prediction memory currentPrediction = predictions[_tokenId];

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                currentPrediction.name,
                                '", "description":"',
                                currentPrediction.description,
                                '","image": "',
                                "data:image/svg+xml;base64,",
                                buildImage(_tokenId),
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    //only owner

    function withdraw() public payable onlyOwner {
        // This will pay HashLips 5% of the initial sale.
        // You can remove this if you want, or keep it in to support HashLips and his channel.
        // =============================================================================
        (bool hs, ) = payable(0x943590A42C27D08e3744202c4Ae5eD55c2dE240D).call{
            value: (address(this).balance * 5) / 100
        }("");
        require(hs);
        // =============================================================================

        // This will payout the owner 95% of the contract balance.
        // Do not remove this otherwise you will not be able to withdraw the funds.
        // =============================================================================
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
        // =============================================================================
    }
}
