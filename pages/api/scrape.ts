import chrome from "@sparticuz/chromium"
import { NextApiRequest, NextApiResponse } from "next"
import puppeteer from "puppeteer-core"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath(),
        headless: true,
    })

    const page = await browser.newPage();
    page.goto("https://www.plunge.one", {
        waitUntil: "networkidle2"
    });

    const content = await page.content();

    await browser.close();

    res.status(200).json({html: content});
}