// utils.js
// Funções auxiliares reutilizáveis em todo o projeto

/**
 * Escapa caracteres HTML para prevenir XSS (Cross-Site Scripting)
 * @param {string} text - Texto que pode conter HTML
 * @returns {string} Texto seguro com caracteres HTML escapados
 */
export function escapeHtml(text) {
    if (!text) return '';

    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Mostra uma notificação toast na tela
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificação: 'success' ou 'error'
 * @param {number} duration - Duração em milissegundos (padrão: 2000)
 */
export function showToast(message, type = 'success', duration = 2000) {
    // Remove toast existente se houver
    const existingToast = document.getElementById('dynamic-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'dynamic-toast';
    toast.className = `toast-notification ${type === 'error' ? 'toast-error' : ''}`;

    const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${escapeHtml(message)}</span>
    `;

    document.body.appendChild(toast);

    // Força reflow para animação
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Copia texto para a área de transferência
 * @param {string} text - Texto a ser copiado
 * @returns {Promise<boolean>} - Retorna true se sucesso, false se erro
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Comando copiado com sucesso!', 'success');
        return true;
    } catch (err) {
        console.error('Erro ao copiar: ', err);
        showToast('Erro ao copiar comando', 'error');
        return false;
    }
}

/**
 * Debounce - Limita a frequência de execução de uma função
 * Útil para inputs de busca para não sobrecarregar
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em milissegundos
 * @returns {Function} Função com debounce aplicado
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle - Limita a execução de uma função a no máximo uma vez a cada X ms
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite em milissegundos
 * @returns {Function} Função com throttle aplicado
 */
export function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Formata a data para exibição amigável
 * @param {Date|string} date - Data a ser formatada
 * @returns {string} Data formatada (ex: "15 de Janeiro, 2024")
 */
export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Gera um ID único para elementos dinâmicos
 * @param {string} prefix - Prefixo opcional
 * @returns {string} ID único
 */
export function generateUniqueId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Filtra comandos com base em termo de busca e categoria
 * @param {Array} commands - Array de comandos
 * @param {string} searchTerm - Termo de busca
 * @param {string} category - Categoria selecionada
 * @returns {Array} Comandos filtrados
 */
export function filterCommands(commands, searchTerm, category) {
    return commands.filter(cmd => {
        const matchesCategory = category === "all" || cmd.category === category;
        const matchesSearch = searchTerm === "" ||
            cmd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.cmd.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

/**
 * Obtém ícone baseado na categoria do comando
 * @param {string} category - Categoria do comando
 * @returns {string} Classe do ícone Font Awesome
 */
export function getCategoryIcon(category) {
    const icons = {
        "DNS": "fa-globe",
        "Email": "fa-envelope",
        "Network": "fa-network-wired",
        "HTTP": "fa-globe",
        "SSL": "fa-lock"
    };
    return icons[category] || "fa-terminal";
}

/**
 * Salva dados no localStorage com validação
 * @param {string} key - Chave para armazenar
 * @param {any} data - Dados a serem salvos
 * @returns {boolean} Sucesso da operação
 */
export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        return false;
    }
}

/**
 * Recupera dados do localStorage
 * @param {string} key - Chave dos dados
 * @param {any} defaultValue - Valor padrão se não encontrar
 * @returns {any} Dados recuperados ou valor padrão
 */
export function getFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Erro ao recuperar do localStorage:', error);
        return defaultValue;
    }
}

/**
 * Adiciona evento de clique fora de um elemento (útil para modals, dropdowns)
 * @param {HTMLElement} element - Elemento a ser observado
 * @param {Function} callback - Função a ser executada ao clicar fora
 * @returns {Function} Função para remover o listener
 */
export function onClickOutside(element, callback) {
    const handler = (event) => {
        if (!element.contains(event.target)) {
            callback(event);
        }
    };

    document.addEventListener('click', handler);

    // Retorna função para remover o listener
    return () => document.removeEventListener('click', handler);
}

/**
 * Detecta se o dispositivo é mobile
 * @returns {boolean} True se for mobile
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth <= 768;
}

/**
 * Scroll suave para um elemento
 * @param {string|HTMLElement} element - Elemento ou seletor CSS
 * @param {number} offset - Deslocamento opcional (em pixels)
 */
export function smoothScrollTo(element, offset = 0) {
    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (!target) return;

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Valida se um domínio tem formato válido
 * @param {string} domain - Domínio a ser validado
 * @returns {boolean} True se formato válido
 */
export function isValidDomain(domain) {
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
}

/**
 * Extrai domínio de uma URL
 * @param {string} url - URL completa
 * @returns {string|null} Domínio extraído ou null
 */
export function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return null;
    }
}

/**
 * Trunca texto com ellipsis
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Tamanho máximo
 * @returns {string} Texto truncado
 */
export function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

/**
 * Cria um elemento DOM com classes e atributos
 * @param {string} tag - Tag do elemento
 * @param {Object} options - Opções (classes, attributes, text, html)
 * @returns {HTMLElement} Elemento criado
 */
export function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.classes) {
        element.className = options.classes;
    }

    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.html) {
        element.innerHTML = options.html;
    }

    return element;
}

/**
 * Verifica se o elemento está visível na viewport
 * @param {HTMLElement} element - Elemento a verificar
 * @returns {boolean} True se visível
 */
export function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}