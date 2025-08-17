document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const searchInput = document.getElementById('search-input');
    const categories = document.querySelectorAll('.category');
    const allButton = document.querySelector('.filter-button[data-category="all"]');

    // Mapeamento de categorias para os IDs de seção correspondentes
    const categoryMap = {
        'produtividade-e-ferramentas': 'produtividade-e-ferramentas',
        'agilidade-e-inovacao': 'agilidade-e-inovacao',
        'comunicacao-e-relacoes': 'comunicacao-e-relacoes',
        'gestao-e-lideranca': 'gestao-e-lideranca',
        'ia-e-dados': 'ia-e-dados',
        'desenvolvimento-pessoal': 'desenvolvimento-pessoal',
        'diversidade-e-inclusao': 'diversidade-e-inclusao',
        'administracao-publica-e-governanca': 'administracao-publica-e-governanca'
    };

    // Função para filtrar os cards
    const filterCards = (query, category) => {
        categories.forEach(catSection => {
            const sectionId = catSection.id;
            const isCategoryMatch = category === 'all' || categoryMap[category] === sectionId;
            let hasVisibleCards = false;

            if (isCategoryMatch) {
                const cards = catSection.querySelectorAll('.course-card');
                
                cards.forEach(card => {
                    const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                    const isQueryMatch = cardTitle.includes(query.toLowerCase());
                    
                    if (isQueryMatch) {
                        card.style.display = 'flex';
                        hasVisibleCards = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            // Mostra ou esconde a seção inteira com base na categoria e nos resultados da busca
            catSection.style.display = isCategoryMatch && hasVisibleCards ? 'block' : 'none';
        });
    };

    // Evento de clique para os botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');
            searchInput.value = ''; // Limpa a barra de pesquisa ao clicar em uma categoria
            filterCards('', selectedCategory);
        });
    });

    // Evento para a barra de pesquisa
    searchInput.addEventListener('keyup', (e) => {
        const query = e.target.value;
        allButton.classList.add('active'); // Reativa o botão 'Todas as categorias'
        filterButtons.forEach(btn => {
            if (btn !== allButton) {
                btn.classList.remove('active');
            }
        });
        filterCards(query, 'all');
    });

    // Filtra para mostrar todos os cards ao carregar a página
    filterCards('', 'all');
});