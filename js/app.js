// app.js
import { commands, categories } from './commands.js';
import {
    escapeHtml,
    showToast,
    copyToClipboard,
    debounce,
    filterCommands as filterCommandsUtil,
    getCategoryIcon,
    generateUniqueId,
    saveToLocalStorage,
    getFromLocalStorage
} from './utils.js';

// Estado da aplicação
let currentCategory = "all";
let searchTerm = "";

// Elementos DOM
let commandsContainer;
let searchInput;
let statsContainer;
let filterButtonsContainer;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa elementos
    commandsContainer = document.getElementById('commandsContainer');
    searchInput = document.getElementById('searchInput');
    statsContainer = document.getElementById('statsContainer');
    filterButtonsContainer = document.getElementById('filterButtons');

    if (!commandsContainer) {
        console.error('Elemento commandsContainer não encontrado');
        return;
    }

    // Recupera última busca do localStorage (opcional)
    const savedSearch = getFromLocalStorage('lastSearch', '');
    if (savedSearch && searchInput) {
        searchInput.value = savedSearch;
        searchTerm = savedSearch;
    }

    // Renderiza tudo
    renderStats();
    renderFilterButtons();
    renderCommands();

    // Configura event listeners
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    if (searchInput) {
        // Usa debounce para melhor performance
        const debouncedSearch = debounce((e) => {
            searchTerm = e.target.value;
            saveToLocalStorage('lastSearch', searchTerm);
            renderCommands();
        }, 300);

        searchInput.addEventListener('input', debouncedSearch);
    }
}

// Renderizar botões de filtro
function renderFilterButtons() {
    if (!filterButtonsContainer) return;

    const buttons = [
        { category: "all", label: "Todos" },
        ...categories.map(cat => ({ category: cat, label: cat }))
    ];

    filterButtonsContainer.innerHTML = buttons.map(btn => `
        <button class="filter-btn ${currentCategory === btn.category ? 'active' : ''}" 
                data-category="${btn.category}">
            ${btn.label}
        </button>
    `).join('');

    // Adicionar event listeners aos botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderCommands();

            // Salva categoria no localStorage
            saveToLocalStorage('lastCategory', currentCategory);
        });
    });
}

// Renderizar estatísticas
function renderStats() {
    if (!statsContainer) return;

    const totalCommands = commands.length;
    const categoriesCount = categories.length;
    const dnsCount = commands.filter(c => c.category === "DNS").length;
    const emailCount = commands.filter(c => c.category === "Email").length;

    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${totalCommands}</div>
            <div class="stat-label">Comandos Disponíveis</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${categoriesCount}</div>
            <div class="stat-label">Categorias</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${dnsCount}</div>
            <div class="stat-label">Comandos DNS</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${emailCount}</div>
            <div class="stat-label">Comandos Email</div>
        </div>
    `;
}

// Filtrar comandos usando a função do utils
function filterCommands() {
    return filterCommandsUtil(commands, searchTerm, currentCategory);
}

// Renderizar comandos
function renderCommands() {
    if (!commandsContainer) return;

    const filteredCommands = filterCommands();

    if (filteredCommands.length === 0) {
        commandsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Nenhum comando encontrado</h3>
                <p>Tente buscar por outro termo ou categoria</p>
            </div>
        `;
        return;
    }

    commandsContainer.innerHTML = filteredCommands.map((cmd, index) => {
        const icon = getCategoryIcon(cmd.category);
        const uniqueId = generateUniqueId('cmd');

        return `
            <div class="command-card" data-category="${cmd.category}">
                <div class="command-header">
                    <div class="command-title">
                        <i class="fas ${icon}"></i>
                        <span>${escapeHtml(cmd.title)}</span>
                    </div>
                    <span class="command-category">
                        <i class="fas fa-tag"></i> ${cmd.category}
                    </span>
                </div>
                <div class="command-desc">
                    ${escapeHtml(cmd.desc)}
                </div>
                <div class="command-code">
                    <pre><code id="${uniqueId}">${escapeHtml(cmd.cmd)}</code></pre>
                    <button class="copy-btn" data-cmd-id="${uniqueId}">
                        <i class="fas fa-copy"></i> Copiar
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Adiciona event listeners para os botões de copiar
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const cmdId = btn.dataset.cmdId;
            const codeElement = document.getElementById(cmdId);
            if (codeElement) {
                await copyToClipboard(codeElement.innerText);
            }
        });
    });
}

// Recupera última categoria do localStorage
const savedCategory = getFromLocalStorage('lastCategory', 'all');
if (savedCategory) {
    currentCategory = savedCategory;
}