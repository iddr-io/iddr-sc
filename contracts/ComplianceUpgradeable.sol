// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./BlacklistableUpgradeable.sol";

abstract contract ComplianceUpgradeable is BlacklistableUpgradeable {
    mapping(address => bool) public whitelisted;
    bool public isPublic;

    event Whitelisted(address indexed account);
    event UnWhitelisted(address indexed account);
    event PublicModeUpdated(bool isPublic);

    function __Compliance_init() internal onlyInitializing {
        isPublic = true; // Default mode
    }

    modifier enforceCompliance(address _account) {
        if (isPublic) {
            require(!isBlacklisted(_account), "Compliance: blacklisted");
        } else {
            require(whitelisted[_account], "Compliance: not whitelisted");
        }
        _;
    }

    function setPublic(bool _isPublic) external onlyOwner {
        isPublic = _isPublic;
        emit PublicModeUpdated(_isPublic);
    }

    function addToWhitelist(address _account) external onlyOwner {
        require(_account != address(0), "Whitelist: zero address");
        require(!whitelisted[_account], "Whitelist: already whitelisted");
        whitelisted[_account] = true;
        emit Whitelisted(_account);
    }

    function removeFromWhitelist(address _account) external onlyOwner {
        require(whitelisted[_account], "Whitelist: not whitelisted");
        whitelisted[_account] = false;
        emit UnWhitelisted(_account);
    }

    function isCompliant(address _account) public view returns (bool) {
        if (isPublic) {
            return !isBlacklisted(_account);
        } else {
            return whitelisted[_account];
        }
    }
}
