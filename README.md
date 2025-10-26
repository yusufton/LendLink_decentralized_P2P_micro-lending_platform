# 🔗 LendLink - Decentralized P2P Micro-Lending Platform

[![Stacks](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=flat-square)](https://stacks.co/)
[![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-blue?style=flat-square)](https://clarity-lang.org/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square)](https://www.typescriptlang.org/)

LendLink enables direct peer-to-peer lending between individuals using secure Clarity smart contracts on the Stacks blockchain. Borrowers can request loans with collateral, lenders can fund them directly, and repayments are enforced automatically via smart contracts — no banks, no intermediaries, just transparent and trustless lending.

## 🌟 Features

### Core Functionality
- **🏦 Collateralized Lending**: Secure loans backed by digital collateral
- **⚡ Instant Settlement**: Automated loan creation, funding, and repayment
- **🔐 Trustless Execution**: Smart contracts eliminate counterparty risk
- **💱 Multi-Token Support**: SIP-010 compatible token lending
- **📊 Real-time Price Feeds**: Integrated oracle system for accurate valuations
- **🎯 Flexible Terms**: Customizable interest rates and loan durations

### User Experience
- **👤 Borrower Interface**: Easy loan request creation with collateral management
- **💰 Lender Dashboard**: Browse and fund available loan opportunities
- **📈 Portfolio Tracking**: Monitor active loans and repayment schedules
- **🔄 One-Click Operations**: Streamlined funding, repayment, and cancellation

## 🏗️ Architecture

### Smart Contracts
```
contracts/
├── loan.clar              # Core P2P lending logic
├── lend-token.clar        # LendUSD (LUSD) token implementation
├── price-oracle.clar      # Price feed oracle for valuations
└── sip010-trait.clar      # Standard fungible token interface
```

### Frontend Application
```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Main application views
│   ├── lib/              # Stacks integration utilities
│   └── styles.css        # Application styling
└── package.json          # Frontend dependencies
```

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Clarinet](https://github.com/hirosystems/clarinet) (for smart contract development)
- [Stacks Wallet](https://wallet.hiro.so/) (for transaction signing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yusufton/LendLink_decentralized_P2P_micro-lending_platform.git
   cd LendLink_decentralized_P2P_micro-lending_platform
   ```

2. **Install dependencies**
   ```bash
   # Install contract testing dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Verify smart contracts**
   ```bash
   clarinet check
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## 🔧 Development

### Smart Contract Development

**Test contracts:**
```bash
npm run test
```

**Check contract syntax:**
```bash
clarinet check
```

**Deploy contracts (testnet):**
```bash
clarinet deploy --testnet
```

### Frontend Development

**Start development server:**
```bash
cd frontend
npm run dev
```

**Build for production:**
```bash
cd frontend
npm run build
```

**Preview production build:**
```bash
cd frontend
npm run preview
```

## 📋 Contract API

### Loan Contract (`loan.clar`)

#### Public Functions

**`create-loan`**
```clarity
(define-public (create-loan
  (principal-token <ft>)
  (principal-amount uint)
  (interest-bps uint)
  (duration uint)
  (collateral-token <ft>)
  (collateral-amount uint)
))
```
Creates a new loan request with specified terms and collateral.

**`fund-loan`**
```clarity
(define-public (fund-loan (id uint)))
```
Allows a lender to fund an existing loan request.

**`repay`**
```clarity
(define-public (repay (id uint)))
```
Enables borrowers to repay their loans and reclaim collateral.

**`cancel-loan`**
```clarity
(define-public (cancel-loan (id uint)))
```
Allows borrowers to cancel unfunded loan requests.

#### Read-Only Functions

**`get-loan`**
```clarity
(define-read-only (get-loan (id uint)))
```
Retrieves loan details by ID.

### LendUSD Token Contract (`lend-token.clar`)

Implements SIP-010 standard with additional administrative functions:
- `bootstrap`: Initial token supply creation
- `mint`: Create new tokens (admin only)
- `burn`: Destroy tokens
- Standard SIP-010 functions (transfer, get-balance, etc.)

### Price Oracle Contract (`price-oracle.clar`)

**`set-price`**
```clarity
(define-public (set-price (symbol (string-ascii 16)) (price uint) (decimals uint)))
```
Updates price feeds for supported tokens (publisher only).

**`get-price`**
```clarity
(define-read-only (get-price (symbol (string-ascii 16))))
```
Retrieves current price data for a token symbol.

## 🎮 Usage Guide

### For Borrowers

1. **Connect Wallet**: Link your Stacks wallet to the application
2. **Create Loan Request**: 
   - Specify loan amount in LUSD
   - Set interest rate (in basis points)
   - Choose loan duration (in blocks)
   - Deposit collateral tokens
3. **Wait for Funding**: Your loan appears in the marketplace
4. **Repay Loan**: Pay back principal + interest before due date
5. **Reclaim Collateral**: Automatic release upon successful repayment

### For Lenders

1. **Browse Loans**: View available loan requests in the marketplace
2. **Analyze Risk**: Review borrower collateral and terms
3. **Fund Loans**: Transfer principal amount to borrower
4. **Earn Interest**: Receive repayment with agreed interest
5. **Liquidate if Needed**: Claim collateral on loan defaults

## 🛡️ Security Features

- **Collateral Escrow**: Borrower collateral locked in smart contract
- **Atomic Operations**: All-or-nothing transaction execution
- **Time-based Logic**: Automatic loan expiration and liquidation
- **Access Controls**: Function-level permission management
- **Error Handling**: Comprehensive input validation and error responses

## 🧪 Testing

The project includes comprehensive test suites for all smart contracts:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:report

# Watch mode for development
npm run test:watch
```

Test files located in `/tests/`:
- `loan.test.ts` - Core lending functionality tests
- `lend-token.test.ts` - Token contract tests
- `price-oracle.test.ts` - Oracle functionality tests
- `sip010-trait.test.ts` - Token standard compliance tests

## 🌐 Network Configuration

### Testnet Deployment
- Network: Stacks Testnet
- Contract Deployer: Configure in environment variables
- Frontend Environment: Set `VITE_CONTRACT_DEPLOYER` in `.env`

### Environment Variables
```env
VITE_CONTRACT_DEPLOYER=your-testnet-address
VITE_CONTRACT_LOAN=loan
VITE_CONTRACT_TOKEN=lend-token
```

## 🤝 Contributing

I welcome contributions! Please see the contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Standards
- Follow existing code style and formatting
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the ISC License

## 🙏 Acknowledgments

- Built on Stacks blockchain
- Smart contracts written in [Clarity](https://clarity-lang.org/)
- Frontend powered by React and TypeScript
- Testing framework: [Vitest](https://vitest.dev/) with [Clarinet SDK](https://github.com/hirosystems/clarinet)

## 📞 Support

- **Documentation**: [Stacks Documentation](https://docs.stacks.co/)
- **Community**: [Stacks Discord](https://discord.gg/stacks)
- **Issues**: [GitHub Issues](https://github.com/yusufton/LendLink_decentralized_P2P_micro-lending_platform/issues)

---

**🚀 Ready to revolutionize peer-to-peer lending? Deploy LendLink today!**