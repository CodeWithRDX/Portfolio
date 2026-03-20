async function testCORS() {
  try {
    const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://gfgstatscard.vercel.app/codewithrdx?raw=true'));
    console.log("AllOrigins Status:", res.status);
    console.log("AllOrigins Headers:", res.headers);
    const text = await res.text();
    console.log("AllOrigins Text:", text.slice(0, 50));
  } catch(e) { console.error(e); }
}
testCORS();
