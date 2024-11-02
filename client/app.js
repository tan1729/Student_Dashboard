// Ensure you include the required libraries in your HTML
const contractAddress = '0xD934D55E704C120eD036Ad09517de88a4dCA9806'; // Replace with your deployed contract address
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "studentName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "courseName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rating1",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rating2",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "feedback",
          "type": "string"
        }
      ],
      "name": "ReviewAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "reviews",
      "outputs": [
        {
          "internalType": "string",
          "name": "studentName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "courseName",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "rating1",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "rating2",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "feedback",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_studentName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_courseName",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_rating1",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_rating2",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_feedback",
          "type": "string"
        }
      ],
      "name": "addReview",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getReview",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

// Custom connector class
class CustomConnector {
    async activate() {
        const provider = window.ethereum;

        if (!provider) {
            console.error("MetaMask provider not detected.");
            throw new Error("MetaMask provider not detected.");
        }

        // Request accounts
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const chainId = await provider.request({ method: 'eth_chainId' });

        this.account = accounts[0].toLowerCase();
        this.chainId = chainId;
        this.provider = provider;

        this.subscribeToEvents(provider);

        return { provider, chainId, account: this.account };
    }

    subscribeToEvents(provider) {
        provider.on('accountsChanged', (accounts) => {
            console.log('Accounts changed:', accounts);
            // Handle account change in UI or state
        });

        provider.on('chainChanged', (chainId) => {
            console.log('Chain changed:', chainId);
            // Handle chain change in UI or state
        });
    }
}

// Main logic to connect to MetaMask and interact with the contract
let web3;
let professorReviewContract;
const form = document.getElementById('reviewForm');

async function connectMetaMask() {
    const connector = new CustomConnector();
    try {
        const { provider, chainId, account } = await connector.activate();
        web3 = new Web3(provider);
        professorReviewContract = new web3.eth.Contract(contractABI, contractAddress);
        console.log('Connected to MetaMask:', account);
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentName = 'John Doe';  // Dummy data
    const courseName = 'Blockchain 101';  // Dummy data
    const rating1 = parseInt(document.getElementById('rating1').value, 10);
    const rating2 = parseInt(document.getElementById('rating2').value, 10);
    const feedback = document.getElementById('feedback').value;

    if (!professorReviewContract) {
        console.error('Contract not initialized. Please connect to MetaMask first.');
        return;
    }

    const accounts = await web3.eth.getAccounts();

    professorReviewContract.methods.addReview(studentName, courseName, rating1, rating2, feedback)
        .send({ from: accounts[0] })
        .on('receipt', function(receipt) {
            alert('Review submitted successfully!');
        })
        .on('error', function(error) {
            console.error('Error submitting review:', error);
        });
});

// Connect to MetaMask on page load
window.addEventListener('load', connectMetaMask);
