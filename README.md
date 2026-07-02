# Personal Hub Dashboard

A personal dashboard built with HTML + Alpine.js for daily workflows, market monitoring, financial news, YouTube music search, and quick notes.

## Key Features

- Responsive main dashboard (desktop and mobile).
- Indonesian and English language support via `i18n.js`.
- Real-time connection status (ping).
- Market widgets:
- USD/IDR (ER API)
- BTC/IDR (CoinGecko, with Binance + conversion fallback)
- Real-time IHSG (TradingView scanner)
- Finance news feed (Google News RSS for Detik Finance).
- YouTube search and embedded playback.
- Quick notes stored in `localStorage`.
- Additional pages:
- `about.html`
- `contact.html` (submitted via Formspree)

## Project Structure

```text
personal-hub/
|- index.html
|- about.html
|- contact.html
|- i18n.js
|- ihsg.php
|- news.php
|- api/
|  |- ihsg.js
|  |- news.js
```

## Endpoint Architecture (Fallback)

The frontend uses a fallback strategy for internal endpoints:

1. Try serverless endpoints first:
- `/api/ihsg`
- `/api/news`

2. If they fail, fallback to local PHP endpoints:
- `ihsg.php`
- `news.php`

This means the project can run in two modes:

- Local PHP mode (Laragon/XAMPP): use `ihsg.php` and `news.php`.
- Serverless mode (for example Vercel): use `api/ihsg.js` and `api/news.js`.

## Running Locally (Laragon)

1. Place the project folder inside the web root, for example:
- `c:/laragon/www/my-project/personal-hub`

2. Start Apache in Laragon.

3. Open in your browser:
- `http://localhost/my-project/personal-hub/`

No build step is required, and no Node dependency installation is needed for the basic mode.

## Internal Endpoints

### `GET /api/ihsg` or `GET ihsg.php`

Fetches the latest IHSG data.

Successful response example:

```json
{
  "status": "ok",
  "last": 7123.45,
  "changePct": 0.62,
  "changeAbs": 44.01,
  "updatedAt": "2026-07-02T08:30:00.000Z"
}
```

### `GET /api/news?count=16` or `GET news.php?count=16`

Fetches the latest financial news items from RSS.

Successful response example:

```json
{
  "status": "ok",
  "items": [
    {
      "title": "News title",
      "link": "https://...",
      "pubDate": "Thu, 02 Jul 2026 08:00:00 GMT"
    }
  ]
}
```

## External Services Used

- TradingView scanner endpoint (IHSG)
- Google News RSS (Detik Finance source)
- ER API (USD/IDR)
- CoinGecko and Binance API (BTC)
- YouTube Data API v3
- Formspree (contact form)

## Configuration Notes

- The YouTube API key is currently written directly in `index.html` (`apiKey`).
- For production, it is recommended to move the API key to backend/environment variables to avoid exposing it on the client.

## License

Not specified yet. Add a license (for example MIT) if you plan to publish this project.
