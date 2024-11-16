# Eth Global Bangkok 2024 Pepewagon 

## Overview
Pepewagon is a decentralized application (dApp) for capturing and verifying location-based data on the Scroll network. It consists of two main smart contracts:
- **Pepewagentoken (PPWG)**: An ERC20 token with permit functionality
- **Pepewagon**: A location-based data capture and verification system

## Deployed Contracts (Scroll Sepolia)

### Pepewagentoken (PPWG)
- **Address**: [`0x74bc37d7B2928E9C8e98f9c27c0423ed44b2D52f`](https://sepolia.scrollscan.com/address/0x74bc37d7B2928E9C8e98f9c27c0423ed44b2D52f)
- **Token Symbol**: PPWG
- **Decimals**: 18
- **Total Supply**: 100,000,000,000 PPWG
- **Features**: ERC20Permit support

### Pepewagon
- **Address**: [`0x81E6E2746CDDd8Faa30B859CBF7c62Cdf0deD014`](https://sepolia.scrollscan.com/address/0x81E6E2746CDDd8Faa30B859CBF7c62Cdf0deD014)
- **Features**: Location-based data capture and verification system

## Smart Contract Features

### Pepewagentoken
- Standard ERC20 functionality
- Permit functionality for gasless approvals
- Fixed supply of 100B tokens minted to deployer

### Pepewagon
1. **Data Capture**
   - Store location data with IPFS hashes
   - Latitude/longitude precision to 6 decimal places
   - Automatic contributor point system

2. **Verification System**
   - Multi-signature verification (requires 3 verifications)
   - Prevention of self-verification
   - Bonus points for verified captures

3. **Location Tracking**
   - Unique location mapping system
   - Capture count per location
   - Last update timestamp tracking

## Contract Interaction

### Adding a New Capture
```solidity
function addCapture(
    string memory _ipfsHash,
    int256 _latitude,
    int256 _longitude
) public returns (bytes32)
```
- `_latitude`: Range -90e6 to 90e6 (multiply by 1e6 for precision)
- `_longitude`: Range -180e6 to 180e6 (multiply by 1e6 for precision)
- Returns: Unique capture ID

Example:
```javascript
// Adding a capture at coordinates (40.7128° N, 74.0060° W)
const latitude = 40.7128 * 1e6;  // 40712800
const longitude = -74.0060 * 1e6; // -74006000
const ipfsHash = "QmExample...";
await pepewagon.addCapture(ipfsHash, latitude, longitude);
```

### Verifying a Capture
```solidity
function verifyCapture(bytes32 _captureId) public
```
- Requires different address than capture contributor
- Each address can verify once
- Three verifications required for full verification status

### Querying Location Data
```solidity
function getLocationKey(int256 _lat, int256 _lon) public pure returns (bytes32)
```
- Generates unique key for location lookup

## Events

### NewCapture
```solidity
event NewCapture(
    bytes32 indexed captureId,
    string ipfsHash,
    int256 latitude,
    int256 longitude,
    address indexed contributor
)
```

### CaptureVerified
```solidity
event CaptureVerified(
    bytes32 indexed captureId,
    address indexed verifier,
    uint256 currentVerifications
)
```

## Development

### Prerequisites
- Node.js v14+ and npm
- Hardhat
- OpenZeppelin Contracts v5.0.0

### Installation
```bash
git clone <repository-url>
cd pepewagon-project
npm install
```

### Environment Setup
Create a `.env` file:
```
PRIVATE_KEY=your_wallet_private_key
SCROLLSCAN_API_KEY=your_scrollscan_api_key
```

### Deployment
```bash
npx hardhat run scripts/deploy.js --network scrollSepolia
```

### Testing
```bash
npx hardhat test
```

## Security Considerations
- Latitude/longitude values are stored with 6 decimal precision
- Verification system prevents self-verification
- Uses OpenZeppelin's battle-tested contracts
- Consider rate limiting for production use

## License
MIT

