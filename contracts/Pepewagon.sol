// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Pepewagon {
    // Structs
    struct CaptureData {
        string ipfsHash;
        uint256 timestamp;
        int256 latitude;  // Stored as integer, divide by 1e6 for actual value
        int256 longitude; // Stored as integer, divide by 1e6 for actual value
        address contributor;
        bool verified;
        mapping(address => bool) verifications;
        uint256 verificationCount;
    }

    struct Location {
        int256 latitude;
        int256 longitude;
        uint256 captureCount;
        uint256 lastUpdate;
    }

    // State variables
    mapping(bytes32 => CaptureData) public captures;
    mapping(address => uint256) public contributorPoints;
    mapping(bytes32 => Location) public mappedLocations;
    uint256 public totalCaptures;
    
    // Events
    event NewCapture(
        bytes32 indexed captureId,
        string ipfsHash,
        int256 latitude,
        int256 longitude,
        address indexed contributor
    );

    event CaptureVerified(
        bytes32 indexed captureId,
        address indexed verifier,
        uint256 currentVerifications
    );

    // Functions
    function addCapture(
        string memory _ipfsHash,
        int256 _latitude,
        int256 _longitude
    ) public returns (bytes32) {
        require(_latitude >= -90e6 && _latitude <= 90e6, "Invalid latitude");
        require(_longitude >= -180e6 && _longitude <= 180e6, "Invalid longitude");
        
        bytes32 captureId = keccak256(abi.encodePacked(
            _ipfsHash,
            _latitude,
            _longitude,
            block.timestamp,
            msg.sender
        ));

        CaptureData storage capture = captures[captureId];
        capture.ipfsHash = _ipfsHash;
        capture.timestamp = block.timestamp;
        capture.latitude = _latitude;
        capture.longitude = _longitude;
        capture.contributor = msg.sender;
        
        // Update contributor points
        contributorPoints[msg.sender]++;
        totalCaptures++;
        
        // Update location data
        bytes32 locationKey = getLocationKey(_latitude, _longitude);
        Location storage location = mappedLocations[locationKey];
        location.latitude = _latitude;
        location.longitude = _longitude;
        location.captureCount++;
        location.lastUpdate = block.timestamp;
        
        emit NewCapture(captureId, _ipfsHash, _latitude, _longitude, msg.sender);
        return captureId;
    }

    function verifyCapture(bytes32 _captureId) public {
        CaptureData storage capture = captures[_captureId];
        require(capture.timestamp > 0, "Capture does not exist");
        require(!capture.verifications[msg.sender], "Already verified by this address");
        require(msg.sender != capture.contributor, "Cannot verify own capture");

        capture.verifications[msg.sender] = true;
        capture.verificationCount++;
        
        if (capture.verificationCount >= 3 && !capture.verified) {
            capture.verified = true;
            contributorPoints[capture.contributor] += 2; // Bonus points for verified capture
        }

        emit CaptureVerified(_captureId, msg.sender, capture.verificationCount);
    }
    
    function getLocationKey(int256 _lat, int256 _lon) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_lat, _lon));
    }
}