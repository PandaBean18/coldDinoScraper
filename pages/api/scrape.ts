import chrome from "@sparticuz/chromium"
import { NextApiRequest, NextApiResponse } from "next"
import puppeteer from "puppeteer-core"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const k = req.body["api_key"];

        if (k !== process.env.API_KEY) {
            res.status(403).json({message: "Unauthorized"});
            return;
        }

        const url = req.body["url"];

        const browser = await puppeteer.launch({
            args: chrome.args,
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath(),
            headless: "new" as any,
        })

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: "networkidle2"
        });

        const content = await page.content();

        await browser.close();

        res.status(200).json({html: content});

    } else {
        if (req.query.ping === "true") {
            res.status(200).json({message: "pong!"});
            return;
        }
        res.status(405).json({message: "method not allowed"})
    }
}