let state = {
    ideas: [
        { id: 1, title: "Carrusel: 5 Errores SEO técnicos en 2026", tag: "Instagram", desc: "Explicar la importancia de los Core Web Vitals móviles y el renderizado JavaScript.", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&auto=format&fit=crop&q=80" },
        { id: 2, title: "Estrategia de Link Building Orgánico", tag: "SEO On-Page", desc: "Infografía detallada sobre cómo conseguir enlaces de autoridad mediante guest posting.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=80" },
        { id: 3, title: "Guía de Optimización para IA Search (SGE)", tag: "Tendencias", desc: "Cómo estructurar el contenido para aparecer en los motores de búsqueda conversacionales.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80" }
    ],
    clients: [
        { id: 1, name: "TechCorp Global", status: "Activo", files: 12 },
        { id: 2, name: "Moda Sustentable Co.", status: "En Revisión", files: 5 },
        { id: 3, name: "Finanzas Smart", status: "Estrategia SEO", files: 8 }
    ],
    palettes: [
        { id: 1, name: "Sky & Sunset", colors: ["#38bdf8", "#8b5cf6", "#f472b6", "#c084fc"] },
        { id: 2, name: "Pastel Dream", colors: ["#e0f2fe", "#fce7f3", "#ede9fe", "#ffffff"] },
        { id: 3, name: "Vibrant Gradient", colors: ["#0f172a", "#38bdf8", "#8b5cf6", "#f472b6"] }
    ],
    notes: [
        { id: 1, text: "Revisar la caída de tráfico orgánico en el cluster de artículos de finanzas para TechCorp." },
        { id: 2, text: "Ideas para YouTube: ¿Muere el SEO tradicional? Entrevista con expertos." }
    ],
    events: [
        { day: 3, title: "Auditoría SEO" },
        { day: 8, title: "Post Reel" },
        { day: 13, title: "Keyword Research" },
        { day: 20, title: "Lanzamiento Blog" }
    ]
};

function switchView(viewName, element) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById('view-' + viewName).classList.add('active');
    element.classList.add('active');
}

function renderAll() {
    renderIdeas();
    renderClients();
    renderPalettes();
    renderNotes();
    renderCalendar();
}

function renderIdeas() {
    const grid = document.getElementById('ideas-grid');
    grid.innerHTML = state.ideas.map(item => `
        <div class="pin-card">
            <div class="pin-media" style="background-image: url('${item.image}')"></div>
            <div class="pin-content">
                <span class="pin-tag">${item.tag}</span>
                <div class="pin-title">${item.title}</div>
                <div class="pin-desc">${item.desc}</div>
            </div>
        </div>
    `).join('');
}

function renderClients() {
    const grid = document.getElementById('folders-grid');
    grid.innerHTML = state.clients.map(c => `
        <div class="folder-card">
            <div class="folder-icon-wrap"><i class="fa-solid fa-folder"></i></div>
            <div class="folder-name">${c.name}</div>
            <div class="folder-meta"><i class="fa-solid fa-circle" style="font-size: 0.5rem; color: var(--sky-blue);"></i> ${c.status} • ${c.files} archivos</div>
        </div>
    `).join('');
}

function renderPalettes() {
    const grid = document.getElementById('palettes-grid');
    grid.innerHTML = state.palettes.map(p => `
        <div class="palette-card">
            <div class="palette-name">${p.name}</div>
            <div class="palette-colors">
                ${p.colors.map(col => `<div class="color-swatch" style="background: ${col};" title="${col}"></div>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderNotes() {
    const container = document.getElementById('notes-container');
    container.innerHTML = state.notes.map(n => `
        <div class="note-card">
            <textarea>${n.text}</textarea>
            <div class="note-footer">
                <span>Creado hoy</span>
                <i class="fa-solid fa-trash" style="cursor: pointer;" onclick="deleteNote(${n.id})"></i>
            </div>
        </div>
    `).join('');
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    // Encabezados de días de la semana
    let html = `
        <div class="cal-header-day">Lun</div>
        <div class="cal-header-day">Mar</div>
        <div class="cal-header-day">Mié</div>
        <div class="cal-header-day">Jue</div>
        <div class="cal-header-day">Vie</div>
        <div class="cal-header-day">Sáb</div>
        <div class="cal-header-day">Dom</div>
    `;

    // Octubre 2026 empieza en Jueves (3 días vacíos antes del 1)
    for (let i = 0; i < 3; i++) {
        html += `<div class="cal-day" style="opacity: 0.3; background: transparent; border: none;"></div>`;
    }

    // Días del 1 al 31 de Octubre 2026
    for (let d = 1; d <= 31; d++) {
        // Buscar eventos para este día
        const dayEvents = state.events.filter(e => e.day === d);
        let eventsHtml = dayEvents.map(e => `<div class="cal-event">${e.title}</div>`).join('');

        html += `
            <div class="cal-day">
                <span class="cal-day-num">${d}</span>
                ${eventsHtml}
            </div>
        `;
    }

    grid.innerHTML = html;
}

let currentModalType = '';

function openModal(type) {
    currentModalType = type;
    const overlay = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    overlay.classList.add('open');

    if (type === 'idea') {
        title.innerText = "Nueva Idea Pinterest";
        content.innerHTML = `
            <div class="form-group"><label>Título</label><input type="text" id="m-title" placeholder="Ej: Reel sobre optimización SEO"></div>
            <div class="form-group"><label>Categoría / Tag</label><input type="text" id="m-tag" placeholder="Ej: Instagram / SEO"></div>
            <div class="form-group"><label>Descripción</label><textarea id="m-desc" placeholder="Breve resumen de la idea..."></textarea></div>
            <div class="form-group"><label>URL Imagen de Portada</label><input type="text" id="m-img" placeholder="https://images.unsplash.com/..."></div>
        `;
    } else if (type === 'client') {
        title.innerText = "Nueva Carpeta de Cliente";
        content.innerHTML = `
            <div class="form-group"><label>Nombre del Cliente o Marca</label><input type="text" id="m-cname" placeholder="Ej: Acme Inc."></div>
            <div class="form-group"><label>Estado del Proyecto</label><select id="m-cstatus"><option>Activo</option><option>En Revisión</option><option>Estrategia SEO</option></select></div>
        `;
    } else if (type === 'palette') {
        title.innerText = "Nueva Paleta de Colores";
        content.innerHTML = `
            <div class="form-group"><label>Nombre de la Paleta</label><input type="text" id="m-pname" placeholder="Ej: Neon Glow"></div>
            <div class="form-group"><label>Colores (separados por coma)</label><input type="text" id="m-pcolors" placeholder="#38bdf8, #8b5cf6, #f472b6"></div>
        `;
    } else if (type === 'event') {
        title.innerText = "Programar Cita / Evento";
        content.innerHTML = `
            <div class="form-group"><label>Título del Evento</label><input type="text" id="m-etitle" placeholder="Ej: Reunión con cliente"></div>
            <div class="form-group"><label>Día del mes (1 - 31)</label><input type="number" id="m-eday" min="1" max="31" placeholder="Ej: 15"></div>
        `;
    }
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
}

function saveModalData() {
    if (currentModalType === 'idea') {
        const title = document.getElementById('m-title').value;
        const tag = document.getElementById('m-tag').value;
        const desc = document.getElementById('m-desc').value;
        const image = document.getElementById('m-img').value || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80";
        if(title) state.ideas.unshift({ id: Date.now(), title, tag, desc, image });
        renderIdeas();
    } else if (currentModalType === 'client') {
        const name = document.getElementById('m-cname').value;
        const status = document.getElementById('m-cstatus').value;
        if(name) state.clients.unshift({ id: Date.now(), name, status, files: 1 });
        renderClients();
    } else if (currentModalType === 'palette') {
        const name = document.getElementById('m-pname').value;
        const colorsInput = document.getElementById('m-pcolors').value;
        const colors = colorsInput ? colorsInput.split(',').map(c => c.trim()) : ["#38bdf8", "#8b5cf6", "#f472b6"];
        if(name) state.palettes.unshift({ id: Date.now(), name, colors });
        renderPalettes();
    } else if (currentModalType === 'event') {
        const title = document.getElementById('m-etitle').value;
        const day = parseInt(document.getElementById('m-eday').value);
        if(title && day >= 1 && day <= 31) {
            state.events.push({ day, title });
            renderCalendar();
        }
    }
    closeModal();
}

function addNote() {
    state.notes.unshift({ id: Date.now(), text: "Nueva nota rápida..." });
    renderNotes();
}

function deleteNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    renderNotes();
}

renderAll();