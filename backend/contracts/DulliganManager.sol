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
    address payable public vendor;
    address public dulliger;
    address public dulligie;

    constructor(
        address _nftAddress,
        address payable _vendor,
        address _dulliger,
        address _dulligie
    ) {}
}
