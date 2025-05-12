// Mock data for cryptocurrencies
export const coinData = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      image: "/placeholder.svg?height=48&width=48",
      currentPrice: 67890.42,
      priceChangePercentage24h: 2.34,
      marketCap: 1320000000000,
      allTimeHigh: 69000,
      allTimeLow: 67.81,
      high24h: 68200,
      low24h: 66500,
      description:
        "Bitcoin is the first decentralized cryptocurrency, based on blockchain technology. Created in 2009 by an unknown person or group known as Satoshi Nakamoto, it operates without a central authority.",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "eth",
      image: "/placeholder.svg?height=48&width=48",
      currentPrice: 3456.78,
      priceChangePercentage24h: -1.23,
      marketCap: 420000000000,
      allTimeHigh: 4878.26,
      allTimeLow: 0.43,
      high24h: 3500,
      low24h: 3400,
      description:
        "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. It is the second-largest cryptocurrency by market capitalization.",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "sol",
      image: "/placeholder.svg?height=48&width=48",
      currentPrice: 142.35,
      priceChangePercentage24h: 5.67,
      marketCap: 62000000000,
      allTimeHigh: 260.06,
      allTimeLow: 0.5,
      high24h: 145,
      low24h: 135,
      description:
        "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. It's known for its fast transaction speeds and low costs.",
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ada",
      image: "/placeholder.svg?height=48&width=48",
      currentPrice: 0.45,
      priceChangePercentage24h: -0.89,
      marketCap: 16000000000,
      allTimeHigh: 3.1,
      allTimeLow: 0.01,
      high24h: 0.46,
      low24h: 0.44,
      description:
        "Cardano is a proof-of-stake blockchain platform that says its goal is to allow 'changemakers, innovators and visionaries' to bring about positive global change.",
    },
    {
      id: "ripple",
      name: "XRP",
      symbol: "xrp",
      image: "/placeholder.svg?height=48&width=48",
      currentPrice: 0.56,
      priceChangePercentage24h: 1.45,
      marketCap: 30500000000,
      allTimeHigh: 3.84,
      allTimeLow: 0.002,
      high24h: 0.57,
      low24h: 0.55,
      description:
        "XRP is the native cryptocurrency of the XRP Ledger, created by Ripple. It's designed for payment settlement, asset exchange, and remittance systems.",
    },
  ]
  
  // Generate historical price data
  const generateHistoricalData = (basePrice: number, volatility: number, dataPoints: number, interval: number) => {
    const data = []
    let price = basePrice
    const now = Date.now()
  
    for (let i = dataPoints; i >= 0; i--) {
      const change = (Math.random() - 0.5) * volatility * price
      price = Math.max(0.01, price + change)
      data.push({
        timestamp: now - i * interval,
        price,
      })
    }
  
    return data
  }
  
  // Mock historical data for different timeframes
  export const historicalData: Record<string, Record<string, Array<{ timestamp: number; price: number }>>> = {
    bitcoin: {
      "1d": generateHistoricalData(67890.42, 0.005, 24, 60 * 60 * 1000),
      "1w": generateHistoricalData(65000, 0.01, 7, 24 * 60 * 60 * 1000),
      "1m": generateHistoricalData(62000, 0.02, 30, 24 * 60 * 60 * 1000),
      "1y": generateHistoricalData(45000, 0.03, 365, 24 * 60 * 60 * 1000),
    },
    ethereum: {
      "1d": generateHistoricalData(3456.78, 0.006, 24, 60 * 60 * 1000),
      "1w": generateHistoricalData(3300, 0.012, 7, 24 * 60 * 60 * 1000),
      "1m": generateHistoricalData(3100, 0.025, 30, 24 * 60 * 60 * 1000),
      "1y": generateHistoricalData(2200, 0.035, 365, 24 * 60 * 60 * 1000),
    },
    solana: {
      "1d": generateHistoricalData(142.35, 0.008, 24, 60 * 60 * 1000),
      "1w": generateHistoricalData(135, 0.015, 7, 24 * 60 * 60 * 1000),
      "1m": generateHistoricalData(120, 0.03, 30, 24 * 60 * 60 * 1000),
      "1y": generateHistoricalData(80, 0.04, 365, 24 * 60 * 60 * 1000),
    },
    cardano: {
      "1d": generateHistoricalData(0.45, 0.007, 24, 60 * 60 * 1000),
      "1w": generateHistoricalData(0.43, 0.014, 7, 24 * 60 * 60 * 1000),
      "1m": generateHistoricalData(0.4, 0.028, 30, 24 * 60 * 60 * 1000),
      "1y": generateHistoricalData(0.35, 0.038, 365, 24 * 60 * 60 * 1000),
    },
    ripple: {
      "1d": generateHistoricalData(0.56, 0.006, 24, 60 * 60 * 1000),
      "1w": generateHistoricalData(0.54, 0.013, 7, 24 * 60 * 60 * 1000),
      "1m": generateHistoricalData(0.5, 0.026, 30, 24 * 60 * 60 * 1000),
      "1y": generateHistoricalData(0.4, 0.036, 365, 24 * 60 * 60 * 1000),
    },
  }
  