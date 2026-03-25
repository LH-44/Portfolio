// MATRIX EFFECT
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    });
}

setInterval(draw, 33);

// FORM SUBMIT
document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: name.value,
        email: email.value,
        message: message.value
    };

    await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Feedback saved in MongoDB 🚀");
});

// SKILLS PIE CHART
const ctxPie = document.getElementById('skillsChart').getContext('2d');

const skillsChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: [
            'HTML',
            'CSS',
            'JavaScript',
            'Node.js',
            'MongoDB',
            'Git & GitHub'
        ],
        datasets: [{
            data: [20, 15, 25, 15, 15, 10],
            backgroundColor: [
                '#e34c26',  // HTML
                '#264de4',  // CSS
                '#f0db4f',  // JS
                '#68a063',  // Node
                '#4db33d',  // MongoDB
                '#333333'   // Git
            ],
            borderWidth: 1

            hoverOff    set: 10
        }]
    },
    options: {
        animation: {
    animateScale: true
        }   
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        }
    }
});