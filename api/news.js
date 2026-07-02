function parseCount(rawCount) {
    const parsed = Number.parseInt(Array.isArray(rawCount) ? rawCount[0] : rawCount, 10);
    if (Number.isNaN(parsed)) return 16;
    return Math.min(200, Math.max(4, parsed));
}

function decodeXmlText(value) {
    return value
        .replace(/^<!\[CDATA\[/, "")
        .replace(/\]\]>$/, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'");
}

function getTagValue(block, tag) {
    const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
    if (!match) return "";
    return decodeXmlText(match[1].trim());
}

module.exports = async function handler(req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");

    const count = parseCount(req.query?.count);
    const rssUrl = "https://news.google.com/rss/search?q=site:finance.detik.com&hl=id&gl=ID&ceid=ID:id";

    try {
        const response = await fetch(rssUrl, {
            headers: {
                "User-Agent": "MorningMalas/1.0",
                "Accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
            },
        });

        if (!response.ok) {
            res.status(502).json({ status: "error", message: "Gagal mengambil feed Detik Finance" });
            return;
        }

        const rssContent = await response.text();
        if (!rssContent || !rssContent.trim()) {
            res.status(502).json({ status: "error", message: "Feed Detik Finance kosong" });
            return;
        }

        const itemMatches = [...rssContent.matchAll(/<item\b[\s\S]*?<\/item>/gi)];
        const items = itemMatches.map((itemMatch) => {
            const block = itemMatch[0];
            return {
                title: getTagValue(block, "title"),
                link: getTagValue(block, "link"),
                pubDate: getTagValue(block, "pubDate"),
            };
        }).filter((item) => item.title && item.link)
            .sort((a, b) => {
                const timeA = Date.parse(a.pubDate || "") || 0;
                const timeB = Date.parse(b.pubDate || "") || 0;
                return timeB - timeA;
            })
            .slice(0, count);

        if (items.length === 0) {
            res.status(502).json({ status: "error", message: "Tidak ada berita dari feed Detik Finance" });
            return;
        }

        res.status(200).json({ status: "ok", items });
    } catch (error) {
        res.status(502).json({ status: "error", message: "Gagal mengambil feed Detik Finance" });
    }
};
