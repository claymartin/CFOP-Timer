function renderStreakCalendar() {
    const canvas = document.getElementById('streakCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const solvesByDate = {};
    getSolves().forEach(solve => {
        const date = solve.date.slice(0, 10);
        solvesByDate[date] = (solvesByDate[date] || 0) + 1;
    });

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365); // ~1 year

    const boxWidth = 12;
    const boxHeight = 12;
    const padding = 2;
    const cols = 53;
    const rows = Math.ceil(365 / 7);

    let col = 0, row = 0;
    for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dateStr = date.toISOString().slice(0, 10);
        const count = solvesByDate[dateStr] || 0;

        const x = col * (boxWidth + padding);
        const y = row * (boxHeight + padding);

        // Color by count
        let color = '#ebedf0'; // empty
        if (count >= 1) color = '#c6e48b';
        if (count >= 3) color = '#7bc96f';
        if (count >= 5) color = '#196127';

        ctx.fillStyle = color;
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(x, y, boxWidth, boxHeight);

        col++;
        if (col >= cols) {
            col = 0;
            row++;
        }
    }
}
