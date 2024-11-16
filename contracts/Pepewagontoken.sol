// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Pepewagentoken is ERC20, ERC20Permit {
    constructor() ERC20("Pepewagentoken", "PPWG") ERC20Permit("Pepewagentoken") {
        _mint(msg.sender, 100000000000 * 10 ** decimals());
    }
}
