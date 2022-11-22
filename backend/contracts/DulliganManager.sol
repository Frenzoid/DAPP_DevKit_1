//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract DulliganManager {
    address public nftAddress;
    address public dulliger;
    address public dulligie;
    address payable public vendor;


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
}
