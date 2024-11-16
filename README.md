# Eth Global Bangkok 2024 Pepewagon

## Overview
Pepewagon is a decentralized application (dApp) for capturing and verifying location-based data on multiple networks. It consists of two main smart contracts deployed on both Scroll Sepolia and Polygon zkEVM Cardona networks:
- **Pepewagentoken (PPWG)**: An ERC20 token with permit functionality
- **Pepewagon**: A location-based data capture and verification system

## Deployed Contracts

### Polygon zkEVM Cardona Network
#### Pepewagentoken (PPWG)
- **Address**: [`0xAF85A0023fAc623fCE4F20f50BD475C01e6791B1`](https://cardona-zkevm.polygonscan.com/address/0xAF85A0023fAc623fCE4F20f50BD475C01e6791B1)
- **Token Symbol**: PPWG
- **Decimals**: 18
- **Total Supply**: 100,000,000,000 PPWG
- **Features**: ERC20Permit support

#### Pepewagon
- **Address**: [`0xEC0Bc9D59A187AA5693084657deC06889A8398bD`](https://cardona-zkevm.polygonscan.com/address/0xEC0Bc9D59A187AA5693084657deC06889A8398bD)
- **Features**: Location-based data capture and verification system

## Network Configurations

### Polygon zkEVM Cardona
```javascript
{
    chainId: '0x98a', // 2442
    chainName: 'Polygon zkEVM Cardona',
    rpcUrls: ['https://rpc.cardona.zkevm-rpc.com'],
    blockExplorerUrls: ['https://cardona-zkevm.polygonscan.com/']
}
```

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
   - Supported on both networks

2. **Verification System**
   - Multi-signature verification (requires 3 verifications)
   - Prevention of self-verification
   - Bonus points for verified captures
   - Cross-network verification tracking

3. **Location Tracking**
   - Unique location mapping system
   - Capture count per location
   - Last update timestamp tracking
   - Network-specific tracking

## Reward System
- **Upload Reward**: 50 PPWG tokens per successful upload
- **Verification Reward**: 30 PPWG tokens per successful verification
- Rewards are network-specific and distributed on the respective network

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
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### Deployment
For Scroll Sepolia:
```bash
npx hardhat run scripts/deploy.js --network scrollSepolia
```

For Polygon zkEVM Cardona:
```bash
npx hardhat run scripts/deploy.js --network polygonZkEVMCardona
```

### Network Configuration
```javascript
module.exports = {
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      chainId: 534351,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygonZkEVMCardona: {
      url: "https://rpc.cardona.zkevm-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 2442
    }
  }
};
```

## Security Considerations
- Latitude/longitude values are stored with 6 decimal precision
- Verification system prevents self-verification
- Uses OpenZeppelin's battle-tested contracts
- Network-specific data segregation
- Consider rate limiting for production use

## Frontend Features
- Network switching support
- Network-specific theming (Purple for Polygon, Blue for Scroll)
- Seamless cross-network experience
- Unified capture and verification interface
- Real-time network status indicators

## License
MIT

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
