const run = async () => {
    await chrome.tabs.executeScript(null, {
        code: `showAnswers()`
    });
    document.getElementById("title").innerText="Hotovo!";
}
run();
