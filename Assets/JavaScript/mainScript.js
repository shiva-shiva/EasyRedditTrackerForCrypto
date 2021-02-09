// Feature: Initializing a new data base.
// Starts here
var cryptoDB = {};
var cryptoList = ["bitcoin", "ethereum", "tether", "polkadot", "litecoin"];

for (let i = 0; i < cryptoList.length; i++) {
  cryptoDB[cryptoList[i]] = {
    id: "",
    symbol: "",
    name: "",
    image: "",
    priceChange: "",
    percentChange: "",
    lastUpdated: "",
  };
}

const emptyReddits = (coin) => {
  for (let i = 0; i < 25; i++) {
    cryptoDB[coin][`reddit${i + 1}`] = {
      title: "",
      url: "",
    };
  }
};

cryptoList.forEach((coin) => emptyReddits(coin));
// Ends here

// Crpto API call
// Start here
async function getDataCrypto(crypto) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=${crypto}`;
  const [result] = await fetch(url).then((res) => res.json());

  let cryptoObj = cryptoDB[crypto];
  cryptoObj.id = result.id;
  cryptoObj.symbol = result.symbol;
  cryptoObj.name = result.name;
  cryptoObj.image = result.image;
  cryptoObj.priceChange = result.price_change_24h.toFixed(2);
  cryptoObj.percentChange = result.price_change_percentage_24h.toFixed(2);
  cryptoObj.lastUpdated = result.last_updated;
}
// End here

// Reddit API call
// Start here
const searchReddit = (crypto, searchLimit, sortBy) => {
  return fetch(
    `https://www.reddit.com/search.json?q=${crypto}&sort=${sortBy}&limit=${searchLimit}`
  )
    .then((response) => response.json())
    .then((data) => data.data.children.map((data) => data.data))
    .catch((err) => console.log(err));
};

const truncateText = (text, limit) => {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
};

const getDataReddit = (crypto) => {
  searchReddit(crypto, 25, "latest").then((results) => {
    let cryptoObj = cryptoDB[crypto];
    for (let i = 0; i < results.length; i++) {
      let data = results[i];
      let redditObj = cryptoObj[`reddit${i + 1}`];
      redditObj.title = data.title;
      redditObj.url = data.url;
    }
  });
};
// End here

// Create a reddit pool from data object.
// Start here

const randomReddit = () => {
  let name = cryptoList[Math.floor(Math.random() * 5)];
  let cryptoObj = cryptoDB[name];
  let redditObj = cryptoObj[`reddit${Math.floor(Math.random() * 25)}`];

  console.log(cryptoObj);
  console.log(redditObj);

  //   console.log(cryptoObj.priceChange);
  //   console.log(cryptoObj.percentChange);
  //   console.log(cryptoObj.image);
  //   console.log(cryptoObj.name);
  //   console.log(redditObj.title);
  //   console.log(cryptoObj.lastUpdated);
  ////parse last updated
  let date = cryptoObj.lastUpdated.split("T");
  dateDisplay = date[0];
  let time = date[1];
  time = time.slice(0, 5);
  //   console.log(date, time);

  let redditArea = document.getElementById("reddits");
  let colorClass = cryptoObj.percentChange < 0 ? "priceDown" : "priceUp";
  let symbolClass = cryptoObj.percentChange < 0 ? "" : "+";
  redditArea.innerHTML += `
    <div class="col-lg-4 col-md-6">
        <div class="card text-white bg-dark mb-3" style="max-width: 400px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${cryptoObj.image}" class="card-img p-4" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title ${colorClass}">${symbolClass}$${cryptoObj.priceChange}  (${symbolClass}${cryptoObj.percentChange}%)</h5>
                        <p class="card-text redditOrange">${redditObj.title}</p>
                        <p class="card-text"><small class="text-muted">Last updated ${dateDisplay} at: ${time}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};
// }
// End here

// Call API and collect all data.
// Start here
const makePool = async () => {
  await getDataCrypto("bitcoin");
  await getDataCrypto("ethereum");
  await getDataCrypto("tether");
  await getDataCrypto("polkadot");
  await getDataCrypto("litecoin");
  getDataReddit("bitcoin");
  getDataReddit("bitcoin");
  getDataReddit("ethereum");
  getDataReddit("tether");
  getDataReddit("polkadot");
  getDataReddit("litecoin");
};
// End here

makePool();

const updateReddit = () => {
  let redditArea = document.getElementById("reddits");
  redditArea.innerHTML = "";
  randomReddit();
  randomReddit();
  randomReddit();
  randomReddit();
  randomReddit();
  randomReddit();
};

setTimeout(setInterval(updateReddit, 5000), 6000);

function userDisplay() {
  let online = JSON.parse(localStorage.getItem("onlineNow"));
  //   console.log(online);
  document.querySelector(
    ".userName"
  ).innerHTML = `Welcome back ${online.userName}!`;
  document.querySelector(".userName").style =
    "font-size: 18px; font-weight: bold; margin-right: 5px; margin-top: 8px;";
  //   console.log(online.userName);
}
window.onload = userDisplay();
