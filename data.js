let solves = JSON.parse(localStorage.getItem('solves') || '[]');

function saveSolves() {
    localStorage.setItem('solves', JSON.stringify(solves));
}

function addSolve(solve) {
    solves.unshift(solve);
    if (solves.length > 10000) solves = solves.slice(0, 10000);
    saveSolves();
}

function getSolves() {
    return solves;
}

function loadSolves() {
    solves = JSON.parse(localStorage.getItem('solves') || '[]');
}

function getSingles() {
    return solves.map(s => parseFloat(s.phases[4]));
}

function calculateAverage(times, n) {
    if (times.length < n) return {avg: 0, best: 0};
    const slice = times.slice(0, n).sort((a,b) => a-b);
    const best = slice[0];
    const avg = slice.reduce((a,b) => a+b, 0) / n;
    return {avg, best};
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return mins ? `${mins}:${secs.padStart(5,'0')}` : secs;
}

function exportSolves() {
    const dataStr = JSON.stringify(solves, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cfop-solves-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}

function importSolves(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            solves = imported.concat(solves);
            saveSolves();
            updateStats();
        } catch (err) {
            alert('Invalid JSON');
        }
    };
    reader.readAsText(file);
}
