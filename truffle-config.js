module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Ganache's default port
      network_id: "5777",    // Match Ganache's network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",      // Use Solidity version 0.8.0 or higher
    },
  },
};
