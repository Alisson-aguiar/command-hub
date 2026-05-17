// commands.js
// Banco de dados de comandos com descrições detalhadas

export const commands = [
    {
        title: "Ver registros MX",
        desc: "O comando nslookup com parâmetro MX (Mail Exchange) consulta os servidores responsáveis pelo recebimento de e-mails de um domínio. Essencial para diagnosticar problemas de entrega de e-mail e verificar se a configuração de e-mail está correta. Retorna os servidores e suas prioridades (quanto menor o número, maior a prioridade).",
        cmd: "nslookup -type=mx dominio.com",
        category: "Email"
    },
    {
        title: "Ver registros MX (alternativa)",
        desc: "Versão mais avançada usando o comando dig (Domain Information Groper). Oferece uma saída mais detalhada e completa que o nslookup, incluindo informações sobre TTL (Time To Live), tempos de resposta e detalhes técnicos adicionais. É a ferramenta preferida por administradores de sistema para análise aprofundada de DNS.",
        cmd: "dig mx dominio.com",
        category: "Email"
    },
    {
        title: "Ver IP do site",
        desc: "Consulta o endereço IP (IPv4 ou IPv6) associado ao domínio. Útil para verificar se o DNS está resolvendo corretamente, identificar o servidor onde o site está hospedado e diagnosticar problemas de conectividade. Mostra também informações sobre o servidor DNS que respondeu à consulta.",
        cmd: "dig dominio.com",
        category: "DNS"
    },
    {
        title: "Ver DNS completo",
        desc: "Lista TODOS os registros DNS disponíveis para o domínio, incluindo A, AAAA, MX, TXT, NS, CNAME, SOA e outros. Esta consulta fornece uma visão completa da configuração DNS, essencial para auditorias de segurança, migrações de servidor e troubleshooting avançado. Atenção: alguns servidores DNS podem limitar ou não suportar consultas 'any'.",
        cmd: "dig dominio.com any",
        category: "DNS"
    },
    {
        title: "Ver servidores DNS",
        desc: "Identifica os servidores DNS autoritativos (Name Servers) responsáveis por gerenciar as zonas DNS do domínio. Mostra quais empresas ou serviços (como Cloudflare, AWS Route 53, GoDaddy) são responsáveis pela resolução DNS. Fundamental para verificar delegação de DNS e diagnosticar problemas de propagação.",
        cmd: "dig ns dominio.com",
        category: "DNS"
    },
    {
        title: "Ver registros TXT",
        desc: "Consulta os registros de texto (TXT) associados ao domínio. Esses registros são cruciais para: verificar configurações de SPF (Sender Policy Framework) que previnem falsificação de e-mail, confirmar DKIM (DomainKeys Identified Mail) para autenticação de e-mail, validar propriedade de domínio para serviços como Google Workspace, e implementar políticas DMARC de segurança.",
        cmd: "dig txt dominio.com",
        category: "DNS"
    },
    {
        title: "Testar conectividade",
        desc: "Comando clássico que envia pacotes ICMP Echo Request para verificar se o servidor está online e respondendo. Mostra estatísticas como tempo de resposta (latência), perda de pacotes e estabilidade da conexão. É o primeiro passo para diagnosticar problemas de rede ou servidor indisponível. Use Ctrl+C para interromper.",
        cmd: "ping dominio.com",
        category: "Network"
    },
    {
        title: "Rota até o servidor",
        desc: "Mapeia o caminho completo que os pacotes de rede percorrem desde sua máquina até o servidor destino. Mostra todos os roteadores intermediários (hops), tempos de resposta de cada salto e ajuda a identificar onde podem estar ocorrendo gargalos, latência excessiva ou falhas de roteamento. Essencial para troubleshooting de rede avançado.",
        cmd: "traceroute dominio.com",
        category: "Network"
    },
    {
        title: "Headers HTTP",
        desc: "Faz uma requisição HTTP HEAD e exibe apenas os cabeçalhos de resposta do servidor web. Mostra informações cruciais como: código de status HTTP (200, 404, 500, etc.), tipo de servidor, políticas de cache, headers de segurança (CSP, HSTS), cookies e configurações de redirecionamento. Perfeito para diagnóstico rápido sem baixar o conteúdo completo.",
        cmd: "curl -I https://dominio.com",
        category: "HTTP"
    },
    {
        title: "Conteúdo da página",
        desc: "Baixa e exibe o conteúdo completo da página web (HTML, JSON, XML, etc.). Útil para verificar o que está sendo realmente entregue pelo servidor, debug de APIs REST, análise de respostas de servidor e extração de informações. Suporta diversos protocolos como HTTP, HTTPS, FTP e muito mais.",
        cmd: "curl https://dominio.com",
        category: "HTTP"
    },
    {
        title: "Redirecionamento",
        desc: "Segue automaticamente redirecionamentos HTTP (301, 302, 307) e mostra apenas os cabeçalhos da resposta final. Permite mapear a cadeia completa de redirecionamentos, identificar loops de redirecionamento e verificar se as regras de redirecionamento estão funcionando conforme esperado. Essencial para SEO e migrações de site.",
        cmd: "curl -L -I http://dominio.com",
        category: "HTTP"
    },
    {
        title: "Tempo de resposta",
        desc: "Mede com precisão o tempo total de carregamento da página, excluindo o download do conteúdo. Retorna métricas detalhadas como: tempo de DNS lookup, tempo de conexão TCP, tempo de SSL handshake, tempo até o primeiro byte (TTFB) e tempo total de transferência. Indispensável para análise de performance e otimização de sites.",
        cmd: "curl -o /dev/null -s -w 'Tempo de DNS: %{time_namelookup}s\nTempo de Conexão: %{time_connect}s\nTempo SSL: %{time_appconnect}s\nTTFB: %{time_starttransfer}s\nTempo Total: %{time_total}s\n' https://dominio.com",
        category: "HTTP"
    },
    {
        title: "Testar SMTP",
        desc: "Testa a conectividade com o servidor SMTP (Simple Mail Transfer Protocol) na porta 25 (padrão para transferência de e-mail). Permite diagnosticar problemas de envio de e-mail, verificar se o servidor está aceitando conexões, testar autenticação e até mesmo enviar e-mails manualmente. Essencial para administradores de servidor de e-mail.",
        cmd: "telnet smtp.dominio.com 25",
        category: "Email"
    },
    {
        title: "Ver SPF",
        desc: "Filtra e exibe especificamente os registros SPF (Sender Policy Framework) do domínio. SPF é um mecanismo de segurança que define quais servidores estão autorizados a enviar e-mails em nome do domínio, prevenindo falsificação de e-mail (spoofing) e melhorando a entregabilidade. Mostra a política configurada e ajuda a diagnosticar problemas de e-mail marcado como spam.",
        cmd: "dig txt dominio.com | grep spf",
        category: "Email"
    },
    {
        title: "Ver DKIM",
        desc: "Consulta o registro DKIM (DomainKeys Identified Mail) que contém a chave pública usada para assinar digitalmente os e-mails enviados pelo domínio. DKIM permite que os servidores de destino verifiquem se o e-mail realmente foi enviado pelo domínio e não foi alterado durante o trânsito. O seletor 'default' pode variar conforme configuração do provedor de e-mail.",
        cmd: "dig txt default._domainkey.dominio.com",
        category: "Email"
    },
    {
        title: "Ver DMARC",
        desc: "Consulta a política DMARC (Domain-based Message Authentication, Reporting & Conformance) que define como os servidores de e-mail devem lidar com mensagens que falham nas verificações SPF e DKIM. DMARC também permite receber relatórios sobre tentativas de envio não autorizadas. Essencial para segurança avançada de e-mail e proteção contra phishing.",
        cmd: "dig txt _dmarc.dominio.com",
        category: "Email"
    },
    {
        title: "Ver SSL",
        desc: "Estabelece uma conexão SSL/TLS com o servidor e exibe informações detalhadas do certificado digital: emissor (CA), titular (CN/SAN), algoritmo de criptografia, versão SSL/TLS, cadeia de certificados e extensões. Permite verificar se o certificado está instalado corretamente, validar a cadeia de confiança e diagnosticar problemas de HTTPS.",
        cmd: "openssl s_client -connect dominio.com:443 -showcerts",
        category: "SSL"
    },
    {
        title: "Validade SSL",
        desc: "Exibe apenas as datas de validade do certificado SSL: data de emissão (notBefore) e data de expiração (notAfter). Permite verificar rapidamente se o certificado está dentro do período de validade, evitando surpresas com expiração. Essencial para monitoramento proativo de certificados SSL e prevenção de avisos de segurança em sites.",
        cmd: "echo | openssl s_client -connect dominio.com:443 2>/dev/null | openssl x509 -noout -dates",
        category: "SSL"
    },
    {
        title: "Acesso SSH",
        desc: "Estabelece uma conexão segura com o servidor remoto usando SSH (Secure Shell). Este comando cria um túnel criptografado para administração remota, transferência de arquivos e execução de comandos no servidor. A segurança é garantida por autenticação com senha ou, preferencialmente, por chaves SSH (mais seguras). Essencial para administração de servidores Linux/Unix.",
        cmd: "ssh usuario@ip -p 22",
        category: "Network"
    },
    {
        title: "Verificar SOA",
        desc: "Consulta o registro SOA (Start of Authority) que contém informações administrativas essenciais da zona DNS: servidor DNS primário, e-mail do administrador, números de série (para controle de versão), timers de atualização e expiração. Fundamental para entender a configuração administrativa do DNS e diagnosticar problemas de sincronização entre servidores.",
        cmd: "dig soa dominio.com",
        category: "DNS"
    },
    {
        title: "Verificar CNAME",
        desc: "Consulta registros CNAME (Canonical Name) que definem aliases de domínio. Um CNAME aponta um nome de domínio para outro, permitindo que múltiplos domínios compartilhem o mesmo endereço IP. Essencial para configurar subdomínios como www, blog, ou shop, e para diagnosticar configurações incorretas que podem afetar a resolução de DNS.",
        cmd: "dig cname www.dominio.com",
        category: "DNS"
    },
    {
        title: "Reverse DNS",
        desc: "Realiza uma consulta DNS reversa (PTR - Pointer Record) que converte um endereço IP em nome de domínio. Essencial para verificar a reputação do servidor de e-mail, pois muitos servidores exigem que o IP tenha um PTR válido para aceitar e-mails. Também útil para identificar o nome do servidor a partir do IP em logs de acesso.",
        cmd: "dig -x 192.168.1.1",
        category: "DNS"
    },
    {
        title: "Monitorar tráfego",
        desc: "Captura e exibe em tempo real todo o tráfego de rede na interface especificada. Mostra pacotes, protocolos (TCP, UDP, ICMP), endereços IP de origem/destino e portas. Versão simplificada do tcpdump, ideal para diagnóstico rápido de tráfego anormal, identificação de conexões não autorizadas e debugging de aplicações de rede.",
        cmd: "tcpdump -i any -n",
        category: "Network"
    },
    {
        title: "Verificar porta aberta",
        desc: "Testa se uma porta específica está aberta e escutando no servidor destino. Essencial para verificar configurações de firewall, se serviços como web (80/443), SSH (22), SMTP (25) ou banco de dados (3306) estão acessíveis. Retorna 'open' se a conexão for bem-sucedida, 'filtered' se bloqueado por firewall.",
        cmd: "nc -zv dominio.com 80",
        category: "Network"
    },
    {
        title: "Análise WHOIS",
        desc: "Consulta informações de registro do domínio no banco de dados WHOIS. Retorna dados como: data de criação e expiração, contatos administrativos e técnicos, servidores DNS, status do domínio e informações do registrante (quando não privado). Essencial para auditoria de domínios, verificações de propriedade e investigações de segurança.",
        cmd: "whois dominio.com",
        category: "DNS"
    }
];

// Exporta também as categorias únicas para uso em filtros
export const categories = [...new Set(commands.map(cmd => cmd.category))];