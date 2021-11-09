//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/interfaces/IERC2981.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/utils/Context.sol";
import "hardhat/console.sol";

contract HoodieMonToken is Context, ERC721Enumerable, ERC721Burnable, ERC721URIStorage, Ownable, IERC2981 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping Struct for Royalties
    struct mappedRoyalties {
        address receiver;
        uint256 percentage;
    }

    // Mapping from token ID to tokenCreator address
    mapping(uint256 => address) private _tokenCreators;

    mapping(string => address) private _originNames;

    mapping(uint256 => mappedRoyalties) royalty;

    // uint _prePrice = 0.002 ether;
    // uint _price = 0.006 ether;
    uint _prePrice = 5 ether;
    uint _price = 10 ether;
    uint MAX_PRE_MINTABLE_COUNT = 100;
    uint MAX_MINTABLE_COUNT = 10000;

    uint _creatorRoyalty = 3;
    uint _publisherRoyalty = 1;

    constructor() ERC721('Hoodiemon', 'HDMN') Ownable() {}

    function mint(string memory tokenUri, string memory name) public payable {
        require(_originNames[name] == address(0), "originName already used");
        require(_price <= msg.value, "Ether value sent is not correct");
        require(totalSupply() <= MAX_MINTABLE_COUNT, "exceed mintable limit");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri);
        setTokenCreator(newItemId, msg.sender);
        _setOriginName(name);
        _setRoyalties(newItemId, msg.sender, _creatorRoyalty);
    }

    function preMint(string memory tokenUri, string memory name) public payable {
        require(_originNames[name] == address(0), "originName already used");
        require(_prePrice <= msg.value, "Ether value sent is not correct");
        require(totalSupply() <= MAX_PRE_MINTABLE_COUNT, "exceed mintable limit");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri);
        setTokenCreator(newItemId, msg.sender);
        _setOriginName(name);
        _setRoyalties(newItemId, msg.sender, _creatorRoyalty);
    }


    function tokenURI(uint256 tokenId) public view virtual override(ERC721URIStorage, ERC721) returns (string memory){
        return super.tokenURI(tokenId);
    }

    function tokenCreator(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Hoodiemon: tokenCreator query for nonexistent token");
        return _tokenCreators[tokenId];
    }

    function burn(uint256 tokenId) public override(ERC721Burnable) {
        super.burn(tokenId);
    }

    function setTokenCreator(uint256 tokenId, address _tokenCreator) public {
        require(_exists(tokenId), "Hoodiemon: tokenCreator set of nonexistent token");
        _tokenCreators[tokenId] = _tokenCreator;
    }

    function _setOriginName(string memory name) internal {
        require(msg.sender != address(0), "invalid sender address");
        _originNames[name] = msg.sender;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
        if (_tokenCreators[tokenId] != address(0)) {
            delete _tokenCreators[tokenId];
        }
    }

    function updateMintableLimit(uint _limit) public onlyOwner {
        MAX_MINTABLE_COUNT = _limit;
    }

    function setPrice(uint _newPrice) public onlyOwner {
        _price = _newPrice;
    }

    function setCreatorRoyalty(uint _royalty) public onlyOwner {
        _creatorRoyalty = _royalty;
    }

    function setPublisherRoyalty(uint _royalty) public onlyOwner {
        _publisherRoyalty = _royalty;
    }

    function royaltyInfo(uint256 _tokenId,uint256 _salePrice ) external view override(IERC2981) returns (address receiver, uint256 royaltyAmount) {
        receiver = royalty[_tokenId].receiver;
        royaltyAmount = _salePrice * royalty[_tokenId].percentage / 100;
    }

    function _setRoyalties(uint256 _tokenId, address _receiver, uint256 _percentage) internal {
        royalty[_tokenId] = mappedRoyalties(_receiver, _percentage);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}