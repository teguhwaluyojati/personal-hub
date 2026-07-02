module.exports = async function handler(req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");

    const payload = {
        symbols: {
            tickers: ["IDX:COMPOSITE"],
            query: { types: [] },
        },
        columns: ["close", "change", "change_abs"],
    };

    try {
        const response = await fetch("https://scanner.tradingview.com/global/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "MorningMalas/1.0",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            res.status(502).json({ status: "error", message: "Gagal mengambil data IHSG" });
            return;
        }

        const decoded = await response.json();
        const values = decoded?.data?.[0]?.d;
        if (!Array.isArray(values)) {
            res.status(502).json({ status: "error", message: "Respon IHSG tidak valid" });
            return;
        }

        const last = Number(values[0]);
        const changePct = Number(values[1]);
        const changeAbs = Number(values[2]);

        if ([last, changePct, changeAbs].some((value) => Number.isNaN(value))) {
            res.status(502).json({ status: "error", message: "Data IHSG tidak lengkap" });
            return;
        }

        res.status(200).json({
            status: "ok",
            last,
            changePct,
            changeAbs,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        res.status(502).json({ status: "error", message: "Gagal mengambil data IHSG" });
    }
};
