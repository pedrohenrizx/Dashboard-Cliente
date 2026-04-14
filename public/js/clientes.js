document.addEventListener('DOMContentLoaded', () => {
    fetchCustomers();
});

async function fetchCustomers() {
    const tableBody = document.getElementById('customers-table-body');

    try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update counts
        document.getElementById('count-start').textContent = data.length > 0 ? '1' : '0';
        document.getElementById('count-end').textContent = data.length;
        document.getElementById('count-total').textContent = data.length;

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-gray-500">Nenhum cliente encontrado.</td></tr>';
            return;
        }

        tableBody.innerHTML = '';
        data.forEach(customer => {
            const statusClass = customer.status === 'Ativo'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors';

            // Basic sanitization for text content
            const sanitize = (str) => {
                const temp = document.createElement('div');
                temp.textContent = str;
                return temp.innerHTML;
            };

            tr.innerHTML = `
                <td class="p-4">
                    <div class="font-medium text-gray-900 dark:text-white">${sanitize(customer.name)}</div>
                    <div class="text-sm text-gray-500 sm:hidden">${sanitize(customer.email)}</div>
                </td>
                <td class="p-4 hidden sm:table-cell text-gray-500 dark:text-gray-400">${sanitize(customer.email)}</td>
                <td class="p-4">
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${statusClass}">
                        ${sanitize(customer.status)}
                    </span>
                </td>
                <td class="p-4 hidden md:table-cell text-gray-700 dark:text-gray-300">R$ ${Number(customer.revenue).toFixed(2)}</td>
                <td class="p-4 hidden lg:table-cell text-gray-500 dark:text-gray-400">${sanitize(customer.lastPurchaseDate) || 'N/A'}</td>
                <td class="p-4 text-right">
                    <button class="text-gray-400 hover:text-primary transition-colors">
                        <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

    } catch (error) {
        console.error("Error fetching customers:", error);
        tableBody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-red-500">Erro ao carregar os dados.</td></tr>';
    }
}