import Chromium from "chrome-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const isDev = !process.env.AWS_LAMBDA_FUNCTION_VERSION;

    let browser;

    if (isDev) {
        browser = await puppeteer.launch({headless: true})
    } else {
        browser = await Chromium.puppeteer.launch({
            args: Chromium.args,
            defaultViewport: Chromium.defaultViewport,
            executablePath: await Chromium.executablePath,
            headless: Chromium.headless
        })
    }

    const page = await browser.newPage();
    await page.goto("https://www.plunge.one", {
        waitUntil: "networkidle2"
    });

    const content = await page.content();

    await browser.close();
    res.status(200).json({html: content});
}