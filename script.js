let state = {
    ideas: [
        { id: 1, title: "Carrusel: 5 Errores SEO técnicos en 2026", tag: "Instagram", desc: "Explicar la importancia de los Core Web Vitals móviles.", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&auto=format&fit=crop&q=80" },
        { id: 2, title: "Estrategia de Link Building Orgánico", tag: "SEO On-Page", desc: "Infografía detallada sobre cómo conseguir enlaces de autoridad.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=80" },
        { id: 3, title: "Guía de Optimización para IA Search (SGE)", tag: "Tendencias", desc: "Cómo estructurar el contenido para aparecer en buscadores conversacionales.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80" }
    ],
    clients: [
        { 
            id: 1, 
            name: "TechCorp Global", 
            status: "Activo", 
            images: [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80"
            ],
            notes: ["Revisar la caída de tráfico orgánico en el cluster de artículos."]
        },
        { 
            id: 2, 
            name: "Moda Sustentable Co.", 
            status: "En Revisión", 
            images: [],
            notes: ["Pendiente aprobación de paleta de colores para redes sociales."]
        },
        { 
            id: 3, 
            name: "Finanzas Smart", 
            status: "Estrategia SEO", 
            images: [],
            notes: ["Keyword research enfocado en finanzas personales."]
        }
    ],
    palettes: [
        { id: 1, name: "Pink Blossom", colors: ["#f472b6", "#fb7185", "#fbcfe8", "#fdf2f8"] },
        { id: 2, name: "Soft Peach & Rose", colors: ["#ffe4e6", "#fecdd3", "#fda4af", "#e11d48"] },
        { id: 3, name: "Vibrant Pink Gradient", colors: ["#831843", "#be185d", "#db2777", "#f472b6"] }
    ],
    notes: [
        { id: 1, text: "Preparar briefing para la campaña de lanzamiento de primavera." },
        { id: 2, text: "Ideas para YouTube: ¿Cómo estructurar un sitemap XML correctamente?" }
    ],
    events: [
        { day: 3, title: "Auditoría SEO" },
        { day: 8, title: "Post Reel" },
        { day: 13, title: "Keyword Research" },
        { day: 20, title: "Lanzamiento Blog" }
    ]
};

let currentClientOpen = null;

function switchView(viewName, element) {
    currentClientOpen = null;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById('view-' + viewName).classList.add('active');
    element.classList.add('active');
    renderAll();
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
    const header = document.getElementById('clients-header');

    if (currentClientOpen !== null) {
        // Vista de detalle de la carpeta de cliente
        const client = state.clients.find(c => c.id === currentClientOpen);
        if (!client) return;

        header.innerHTML = `
            <div class="view-title">
                <button class="btn-secondary" onclick="closeClientFolder()" style="margin-bottom: 12px;"><i class="fa-solid fa-arrow-left"></i> Volver a Clientes</button>
                <h1>${client.name}</h1>
                <p>Estado: ${client.status} • Expediente y recursos visuales</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn-secondary" onclick="openModal('client-img')"><i class="fa-solid fa-image"></i> Añadir Imagen</button>
                <button class="btn-primary" onclick="openModal('client-note')"><i class="fa-solid fa-plus"></i> Nueva Nota</button>
            </div>
        `;

        let imagesHtml = client.images.length > 0 ? client.images.map(img => `
            <div class="pin-card" style="margin-bottom:0;">
                <div class="pin-media" style="background-image: url('${img}')"></div>
            </div>
        `).join('') : `<p style="color: var(--text-muted); grid-column: span 3;">No hay imágenes guardadas en esta carpeta todavía.</p>`;

        let notesHtml = client.notes.length > 0 ? client.notes.map((n, idx) => `
            <div class="note-card" style="min-height: 120px;">
                <p style="font-size: 0.95rem; color: var(--text-main);">${n}</p>
                <div class="note-footer">
                    <span>Nota de cliente</span>
                    <i class="fa-solid fa-trash" style="cursor: pointer;" onclick="deleteClientNote(${client.id}, ${idx})"></i>
                </div>
            </div>
        `).join('') : `<p style="color: var(--text-muted);">No hay notas para este cliente.</p>`;

        grid.style.display = "block";
        grid.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 30px;">
                <div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 14px; color: var(--text-main);">Imágenes y Creatividades</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
                        ${imagesHtml}
                    </div>
                </div>
                <div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 14px; color: var(--text-main);">Notas y Estrategias del Cliente</h3>
                    <div class="notes-container">
                        ${notesHtml}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Vista general de todas las carpetas
        header.innerHTML = `
            <div class="view-title">
                <h1>Carpetas de Clientes</h1>
                <p>Organiza estrategias, keywords y auditorías por cada marca.</p>
            </div>
            <button class="btn-primary" onclick="openModal('client')">
                <i class="fa-solid fa-folder-plus"></i> Nuevo Cliente
            </button>
        `;

        grid.style.display = "grid";
        grid.innerHTML = state.clients.map(c => `
            <div class="folder-card" onclick="openClientFolder(${c.id})">
                <div class="folder-icon-wrap"><i class="fa-solid fa-folder-open"></i></div>
                <div class="folder-name">${c.name}</div>
                <div class="folder-meta"><i class="fa-solid fa-circle" style="font-size: 0.5rem; color: var(--pink-main);"></i> ${c.status} • ${c.images.length} imágenes • ${c.notes.length} notas</div>
            </div>
        `).join('');
    }
}

function openClientFolder(id) {
    currentClientOpen = id;
    renderClients();
}

function closeClientFolder() {
    currentClientOpen = null;
    renderClients();
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
            <textarea oninput="updateNoteText(${n.id}, this.value)">${n.text}</textarea>
            <div class="note-footer">
                <span>Nota rápida</span>
                <i class="fa-solid fa-trash" style="cursor: pointer;" onclick="deleteNote(${n.id})"></i>
            </div>
        </div>
    `).join('');
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    let html = `
        <div class="cal-header-day">Lun</div>
        <div class="cal-header-day">Mar</div>
        <div class="cal-header-day">Mié</div>
        <div class="cal-header-day">Jue</div>
        <div class="cal-header-day">Vie</div>
        <div class="cal-header-day">Sáb</div>
        <div class="cal-header-day">Dom</div>
    `;

    for (let i = 0; i < 3; i++) {
        html += `<div class="cal-day" style="opacity: 0.2; background: transparent; border: none;"></div>`;
    }

    for (let d = 1; d <= 31; d++) {
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
            <div class="form-group"><label>Nombre de la Paleta</label><input type="text" id="m-pname" placeholder="Ej: Rose Gold"></div>
            <div class="form-group"><label>Colores (separados por coma)</label><input type="text" id="m-pcolors" placeholder="#f472b6, #fb7185, #fbcfe8"></div>
        `;
    } else if (type === 'event') {
        title.innerText = "Programar Cita / Evento";
        content.innerHTML = `
            <div class="form-group"><label>Título del Evento</label><input type="text" id="m-etitle" placeholder="Ej: Reunión con cliente"></div>
            <div class="form-group"><label>Día del mes (1 - 31)</label><input type="number" id="m-eday" min="1" max="31" placeholder="Ej: 15"></div>
        `;
    } else if (type === 'client-img') {
        title.innerText = "Agregar Imagen al Cliente";
        content.innerHTML = `
            <div class="form-group"><label>URL de la Imagen</label><input type="text" id="m-cimg" placeholder="https://images.unsplash.com/..."></div>
        `;
    } else if (type === 'client-note') {
        title.innerText = "Nueva Nota para el Cliente";
        content.innerHTML = `
            <div class="form-group"><label>Contenido de la Nota</label><textarea id="m-cnote" placeholder="Escribe los detalles o pendientes..."></textarea></div>
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
        if(name) state.clients.unshift({ id: Date.now(), name, status, images: [], notes: [] });
        renderClients();
    } else if (currentModalType === 'palette') {
        const name = document.getElementById('m-pname').value;
        const colorsInput = document.getElementById('m-pcolors').value;
        const colors = colorsInput ? colorsInput.split(',').map(c => c.trim()) : ["#f472b6", "#fb7185", "#fbcfe8"];
        if(name) state.palettes.unshift({ id: Date.now(), name, colors });
        renderPalettes();
    } else if (currentModalType === 'event') {
        const title = document.getElementById('m-etitle').value;
        const day = parseInt(document.getElementById('m-eday').value);
        if(title && day >= 1 && day <= 31) {
            state.events.push({ day, title });
            renderCalendar();
        }
    } else if (currentModalType === 'client-img') {
        const imgUrl = document.getElementById('m-cimg').value;
        if(imgUrl && currentClientOpen !== null) {
            const client = state.clients.find(c => c.id === currentClientOpen);
            if(client) {
                client.images.push(imgUrl);
                renderClients();
            }
        }
    } else if (currentModalType === 'client-note') {
        const noteText = document.getElementById('m-cnote').value;
        if(noteText && currentClientOpen !== null) {
            const client = state.clients.find(c => c.id === currentClientOpen);
            if(client) {
                client.notes.push(noteText);
                renderClients();
            }
        }
    }
    closeModal();
}

function addNote() {
    state.notes.unshift({ id: Date.now(), text: "Nueva nota rápida..." });
    renderNotes();
}

function updateNoteText(id, text) {
    const note = state.notes.find(n => n.id === id);
    if(note) note.text = text;
}

function deleteNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    renderNotes();
}

function deleteClientNote(clientId, noteIdx) {
    const client = state.clients.find(c => c.id === clientId);
    if(client) {
        client.notes.splice(noteIdx, 1);
        renderClients();
    }
}

renderAll();