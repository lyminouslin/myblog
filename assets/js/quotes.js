(() => {
  const bank = document.getElementById("quote-bank");
  const root = document.querySelector("[data-random-quote]");
  const quoteEn = document.querySelector("[data-quote-en]");
  const quoteZh = document.querySelector("[data-quote-zh]");
  const attribution = document.querySelector("[data-quote-attribution]");

  if (!bank || !root || !quoteEn || !quoteZh || !attribution) return;

  const parseLine = (line) => {
    const parts = line.split("\t");
    if (parts.length !== 4) return null;

    const id = Number.parseInt(parts[0], 10);
    if (!Number.isInteger(id)) return null;

    return {
      id,
      attribution: parts[1],
      quoteEn: parts[2],
      quoteZh: parts[3],
    };
  };

  const quotes = bank.textContent
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map(parseLine)
    .filter(Boolean);

  if (!quotes.length) return;

  const randomIndex = (length) => {
    if (length <= 1) return 0;

    const cryptoApi = window.crypto || window.msCrypto;
    if (!cryptoApi?.getRandomValues) return Math.floor(Math.random() * length);

    const max = 0x100000000;
    const limit = max - (max % length);
    const value = new Uint32Array(1);

    do {
      cryptoApi.getRandomValues(value);
    } while (value[0] >= limit);

    return value[0] % length;
  };

  const selected = quotes[randomIndex(quotes.length)];

  root.dataset.quoteId = String(selected.id);
  root.dataset.quoteCount = String(quotes.length);
  quoteEn.textContent = selected.quoteEn;
  quoteZh.textContent = selected.quoteZh;
  attribution.textContent = selected.attribution;
})();
