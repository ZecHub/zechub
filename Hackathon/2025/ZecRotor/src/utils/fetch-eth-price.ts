// Fetch ETH price from OKX
async function getETHPriceFromOKX(): Promise<number | null> {
  try {
    const response = await fetch(
      "https://www.okx.com/api/v5/market/ticker?instId=ETH-USDT",
    );
    if (!response.ok) {
      throw new Error(`OKX API error: ${response.status}`);
    }
    const data = await response.json();
    // OKX returns an array in the 'data' field; extract the 'last' price
    const price = parseFloat(data.data[0].last);
    console.log(`OKX ETH Price: $${price}`);
    return price;
  } catch (error) {
    console.error("Error fetching price from OKX:", error);
    return null;
  }
}

// Fetch ETH price from Coinbase
async function getETHPriceFromCoinbase(): Promise<number | null> {
  try {
    const response = await fetch(
      "https://api.coinbase.com/v2/prices/ETH-USD/spot",
    );
    if (!response.ok) {
      throw new Error(`Coinbase API error: ${response.status}`);
    }
    const data = await response.json();
    const price = parseFloat(data.data.amount);
    console.log(`Coinbase ETH Price: $${price}`);
    return price;
  } catch (error) {
    console.error("Error fetching price from Coinbase:", error);
    return null;
  }
}

// Fetch ETH price from OKX and Coinbase and return the average price
export async function getEthereumPriceUSD(): Promise<number | null> {
  try {
    // Fetch from both sources
    const [okxPrice, coinbasePrice] = await Promise.all([
      getETHPriceFromOKX(),
      getETHPriceFromCoinbase(),
    ]);

    // If either price is null, use the other one
    if (okxPrice === null && coinbasePrice === null) {
      throw new Error("Failed to fetch price from both sources");
    }
    if (okxPrice === null) return Math.round(coinbasePrice! * 100);
    if (coinbasePrice === null) return Math.round(okxPrice * 100);

    // Calculate average, multiply by 100 and round to integer
    const averagePrice = Math.round(((okxPrice + coinbasePrice) / 2) * 100);

    console.log(
      `Average ETH Price: $${(averagePrice / 100).toFixed(2)} (OKX: $${okxPrice}, Coinbase: $${coinbasePrice})`,
    );
    return averagePrice;
  } catch (error) {
    console.error("Error fetching Ethereum price:", error);
    return null;
  }
}
