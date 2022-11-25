//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract DulliganManager {
    address public nftAddress;
    address public dulliger;
    address public dulligie;
    address payable public vendor;

    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => address) public buyer;

    constructor(
        address _nftAddress,
        address _dulliger,
        address _dulligie,
        address payable _vendor
    ) {
        nftAddress = _nftAddress;
        dulliger = _dulliger;
        dulligie = _dulligie;
        vendor = _vendor;
    }

    function list(
        uint256 _nftID,
        uint256 _purchasePrice,
        address _buyer
    ) public {
        // Transfer NFT from seller to this contract
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true;
        purchasePrice[_nftID] = _purchasePrice;
        buyer[_nftID] = _buyer;
    }
}
