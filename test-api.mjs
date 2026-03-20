async function testFetch() {
  try {
    const lcRes = await fetch('https://competeapi.vercel.app/user/leetcode/codewithrdx/');
    const lcText = await lcRes.text();
    console.log("LC Headers:", lcRes.headers);
    console.log("LC Response:", lcRes.status, lcText.slice(0, 100));

    const gfgRes = await fetch('https://gfgstatscard.vercel.app/codewithrdx?raw=true');
    const gfgText = await gfgRes.text();
    console.log("GFG Headers:", gfgRes.headers);
    console.log("GFG Response:", gfgRes.status, gfgText.slice(0, 100));
  } catch(e) {
    console.error(e);
  }
}
testFetch();
