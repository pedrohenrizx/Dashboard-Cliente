document.addEventListener('DOMContentLoaded', () => {
    // Check if dark mode is active to set chart colors
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#9ca3af' : '#4b5563';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';

    // Chart configs to react to theme changes
    Chart.defaults.color = textColor;
    Chart.defaults.scale.grid.color = gridColor;

    // Growth Chart
    const growthCtx = document.getElementById('growthChart')?.getContext('2d');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Novos Clientes',
                    data: [65, 80, 120, 150, 180, 250],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Segment Chart
    const segmentCtx = document.getElementById('segmentChart')?.getContext('2d');
    if (segmentCtx) {
        new Chart(segmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ativos', 'Inativos', 'Em Risco'],
                datasets: [{
                    data: [70, 20, 10],
                    backgroundColor: [
                        '#10b981', // green
                        '#6b7280', // gray
                        '#ef4444'  // red
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '70%'
            }
        });
    }
});