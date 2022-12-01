//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract DulliganManager {
    address public nftAddress;
    address payable public dulliger;
    address public dulligie;
    address payable public vendor;

    modifier onlyDulliger() {
        require(msg.sender == dulliger, "Only dulliger can call this method");
        _;
    }

    modifier onlyDulligie() {
        require(msg.sender == dulligie, "Only dulligie can call this method");
        _;
    }

    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public purchasePrice;
    // the buyer is kina place holder shoul get filled with dulligie who gets for free
    mapping(uint256 => address) public buyer;
    mapping(uint256 => bool) public dulligieSelected;
    mapping(uint256 => mapping(address => bool)) public approval;

    constructor(
        address _nftAddress,
        address payable _dulliger,
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
    ) public payable onlyDulliger {
        // Transfer NFT from seller to this contract
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true;
        purchasePrice[_nftID] = _purchasePrice;
        buyer[_nftID] = _buyer;
    }

    // Put Under Contract (only dulliger - payable dulliganManager)
    function depositEarnest(uint256 _nftID) public payable onlyDulliger {
        require(msg.value >= purchasePrice[_nftID]);
    }

    // Update Selection Status (only dulligie)
    function updateSelectionStatus(
        uint256 _nftID,
        bool _selected
    ) public onlyDulligie {
        dulligieSelected[_nftID] = _selected;
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Approve Sale
    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }

    // Finalize Sale
    // -> Require selection status (add more items here, like transfer dulligan)
    // -> Require funds to be correct amount
    // -> Transfer NFT to dulligie
    // -> Transfer Funds to Vendor Selected
    function finalizeSale(uint256 _nftID) public {
        require(dulligieSelected[_nftID]);
        require(approval[_nftID][buyer[_nftID]]);
        require(address(this).balance >= purchasePrice[_nftID]);

        isListed[_nftID] = false;

        (bool success, ) = payable(vendor).call{value: address(this).balance}(
            ""
        );
        require(success);

        IERC721(nftAddress).transferFrom(address(this), buyer[_nftID], _nftID);
    }
}
