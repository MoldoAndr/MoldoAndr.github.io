document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        
        if (tab.dataset.tab === 'architecture') {
            renderArchitectureDiagram();
        } else if (tab.dataset.tab === 'dataflow') {
            renderDataflowDiagram();
        } else if (tab.dataset.tab === 'workflow') {
            renderWorkflowDiagram();
        }
    });
});

function renderArchitectureDiagram() {
    d3.select("#diagram").html("");
    
    const width = 1100;
    const height = 900;
    
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("background-color", "rgba(0,0,0,0.8)")
        .style("color", "white")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("font-size", "14px")
        .style("position", "absolute")
        .style("z-index", "100");
    
    const svg = d3.select("#diagram")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(100,50)");
    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on("zoom", (event) => {
            svg.attr("transform", event.transform);
        });
    
    d3.select("#diagram svg").call(zoom);
    
    d3.select("#zoom-in").on("click", () => {
        d3.select("#diagram svg").transition().call(zoom.scaleBy, 1.2);
    });
    
    d3.select("#zoom-out").on("click", () => {
        d3.select("#diagram svg").transition().call(zoom.scaleBy, 0.8);
    });
    
    d3.select("#reset").on("click", () => {
        d3.select("#diagram svg").transition().call(zoom.transform, d3.zoomIdentity.translate(50, 50).scale(1));
    });
    
    const data = {
        name: "Platform",
        color: "#3498db",
        children: [
            {
                name: "Frontend",
                color: "#4563ff",
                children: [
                    {
                        name: "React Framework",
                        desc: "Interfață web intuitivă pentru utilizatori",
                        children: [
                            { name: "Dashboard", desc: "Panou de control principal" },
                            { name: "Editoare text/hex", desc: "Pentru editarea și vizualizarea datelor" },
                            { name: "Vizualizări", desc: "Grafice și reprezentări vizuale" },
                            { name: "Formulare analiză", desc: "Interfețe pentru diverse tipuri de analiză" }
                        ]
                    },
                    {
                        name: "CLI",
                        desc: "Interfață linie de comandă pentru automatizare",
                        children: [
                            { name: "Comenzi API", desc: "Wrapper pentru apeluri API" },
                            { name: "Pipe-uri Unix", desc: "Procesare în pipeline" },
                            { name: "Scripturi", desc: "Automatizări complexe" }
                        ]
                    }
                ]
            },
            {
                name: "Backend",
                color: "#2ecc71",
                children: [
                    {
                        name: "Server Web",
                        desc: "Nginx pentru servire și balansare",
                        children: [
                            { name: "Load Balancer", desc: "Distribuire cereri" },
                            { name: "SSL/TLS", desc: "Securizare conexiuni" },
                            { name: "Cache", desc: "Optimizare performanță" }
                        ]
                    },
                    {
                        name: "Backend Core",
                        desc: "Orchestrare și API management",
                        children: [
                            { name: "REST API", desc: "Interfață programatică pentru servicii" },
                            { name: "Autentificare", desc: "Gestionare sesiuni și permisiuni" },
                            { name: "Task Queue", desc: "Procesare asincronă" },
                            { name: "Logging", desc: "Jurnalizare activități" }
                        ]
                    },
                    {
                        name: "Module Performanță",
                        desc: "Procesare criptografică de înaltă performanță",
                        children: [
                            { name: "Biblioteci C/C++", desc: "Algoritmi optimizați" },
                            { name: "Paralelizare", desc: "Procesare multi-thread" },
                            { name: "GPU Acceleration", desc: "Calcule pe GPU pentru operații intensive" }
                        ]
                    }
                ]
            },
            {
                name: "Utilitare",
                color: "#f39c12",
                children: [
                    {
                        name: "Utilitare Integrate",
                        desc: "Instrumente existente integrate în platformă",
                        children: [
                            { name: "RsaCtfTool", desc: "Analiza și atacuri RSA" },
                            { name: "AES-CTF-Tool", desc: "Analiza și atacuri AES" },
                            { name: "CyberChef", desc: "Procesare date multiple formate" },
                            { name: "Hash-Identifier", desc: "Identificare tipuri hash" }
                        ]
                    },
                    {
                        name: "Funcționalități Dezvoltate",
                        desc: "Module proprii pentru analiză criptografică",
                        children: [
                            { name: "Identificare criptosistem", desc: "Detecție automată a algoritmilor" },
                            { name: "Analiză statistică", desc: "Entropie, frecvență, pattern-uri" },
                            { name: "Testare primalitate", desc: "Algoritmi pentru testare numere prime" },
                            { name: "Analiză coliziuni", desc: "Identificare vulnerabilități hash" }
                        ]
                    }
                ]
            },
            {
                name: "AI",
                color: "#9b59b6",
                children: [
                    {
                        name: "Module AI",
                        desc: "Inteligență artificială pentru analiză avansată",
                        children: [
                            { name: "Recunoaștere pattern-uri", desc: "Identificare modele în date criptate" },
                            { name: "Analiză parole", desc: "Evaluare robustețe și predictibilitate" },
                            { name: "Criptoanaliza asistată", desc: "Asistarea procesului de criptoanaliză" },
                            { name: "Clustering", desc: "Grupare și clasificare date criptografice" }
                        ]
                    },
                    {
                        name: "Module Antrenare",
                        desc: "Gestionare date și îmbunătățire modele",
                        children: [
                            { name: "Dataset-uri", desc: "Colecții de date pentru antrenare" },
                            { name: "Pipeline antrenare", desc: "Procesul de antrenare a modelelor" },
                            { name: "Validare", desc: "Testare și validare rezultate" },
                            { name: "Transfer learning", desc: "Reutilizare modele pre-antrenate" }
                        ]
                    }
                ]
            },
            {
                name: "Baze de Date",
                color: "#e74c3c",
                children: [
                    {
                        name: "Baze de Date Generale",
                        desc: "Stocare date generale ale platformei",
                        children: [
                            { name: "PostgreSQL", desc: "Date relaționale" },
                            { name: "MongoDB", desc: "Date nestructurate" },
                            { name: "Redis", desc: "Cache și mesagerie" }
                        ]
                    },
                    {
                        name: "Baze de Date Specializate",
                        desc: "Date specializate pentru criptanaliză",
                        children: [
                            { name: "DB Numere Prime", desc: "Colecție optimizată de numere prime" },
                            { name: "Semnături Criptografice", desc: "Identificare algoritmi" },
                            { name: "Rainbow Tables", desc: "Hash-uri precalculate" },
                            { name: "Wordlists", desc: "Dicționare pentru cracking" }
                        ]
                    }
                ]
            }
        ]
    };
    
    const treeLayout = d3.tree().size([height - 150, width - 250]);
    
    const root = d3.hierarchy(data);
    treeLayout(root);
    
    svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
        .style("fill", "none")
        .style("stroke", "#999")
        .style("stroke-width", "1.5px");
    
    
    const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(1000)
                .style("opacity", .9);
            
            let tooltipContent = `<strong>${d.data.name}</strong>`;
            if (d.data.desc) {
                tooltipContent += `<br>${d.data.desc}`;
            }
            
            tooltip.html(tooltipContent)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    
    
    nodes.append("rect")
        .attr("x", -80)
        .attr("y", -20)
        .attr("width", 160)
        .attr("height", 40)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", d => {
            let current = d;
            while (current && !current.data.color) {
                current = current.parent;
            }
            return current ? current.data.color : "#999";
        })
        .style("fill-opacity", d => 1 - 0.2 * d.depth);
    
    
    nodes.append("text")
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(d => d.data.name)
        .style("font-size", d => Math.max(18 - d.depth * 2, 12) + "px") 
        .style("font-weight", "bold")
        .style("fill", "#fff");
}


function renderDataflowDiagram() {
    
    d3.select("#dataflow-diagram").html("");
    
    const width = 1200;
    const height = 500; 
    
    const svg = d3.select("#dataflow-diagram")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#666");
    
    
    const nodes = [
        { id: "user", label: "Utilizator", x: 100, y: 350, type: "actor" },
        { id: "frontend", label: "Frontend", x: 250, y: 250, type: "frontend" },
        { id: "cli", label: "CLI", x: 250, y: 450, type: "frontend" },
        { id: "api", label: "API Gateway", x: 400, y: 350, type: "backend" },
        { id: "orchestrator", label: "Orchestrator", x: 550, y: 350, type: "backend" },
        { id: "crypto_engine", label: "Motor Criptografic", x: 700, y: 250, type: "backend" },
        { id: "tools", label: "Utilitare Integrate", x: 700, y: 450, type: "tools" },
        { id: "ai_analyzer", label: "Analizor AI", x: 850, y: 350, type: "ai" },
        { id: "db", label: "Baze de Date", x: 1000, y: 350, type: "database" }
    ];
    
    
    const links = [
        { source: "user", target: "frontend", label: "Interacțiune UI" },
        { source: "user", target: "cli", label: "Comenzi CLI" },
        { source: "frontend", target: "api", label: "Cereri HTTP" },
        { source: "cli", target: "api", label: "Cereri API" },
        { source: "api", target: "orchestrator", label: "" },
        { source: "orchestrator", target: "crypto_engine", label: "" },
        { source: "orchestrator", target: "tools", label: "" },
        { source: "crypto_engine", target: "ai_analyzer", label: "" },
        { source: "tools", target: "ai_analyzer", label: "" },
        { source: "ai_analyzer", target: "db", label: "" },
        { source: "db", target: "orchestrator", label: "" },
        { source: "orchestrator", target: "api", label: "" },
        { source: "api", target: "frontend", label: "Răspunsuri HTTP" },
        { source: "api", target: "cli", label: "Răspunsuri API" }
    ];
    
    
    const colorMap = {
        "actor": "#666",
        "frontend": "#3498db",
        "backend": "#2ecc71",
        "tools": "#f39c12",
        "ai": "#9b59b6",
        "database": "#e74c3c"
    };
    
    
    const linkElements = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("g")
        .attr("class", "link");
        
    
    linkElements.append("path")
        .attr("d", d => {
            const source = nodes.find(n => n.id === d.source);
            const target = nodes.find(n => n.id === d.target);
            
            
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const dr = Math.sqrt(dx * dx + dy * dy) * 1.5; 
            
            return `M${source.x},${source.y}A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
        })
        .style("fill", "none")
        .style("stroke", "#666")
        .style("stroke-width", "2px")
        .attr("marker-end", "url(#arrowhead)");
    
    
    linkElements.append("rect")
        .attr("x", d => {
            const source = nodes.find(n => n.id === d.source);
            const target = nodes.find(n => n.id === d.target);
            return (source.x + target.x) / 2 - d.label.length * 4;
        })
        .attr("y", d => {
            const source = nodes.find(n => n.id === d.source);
            const target = nodes.find(n => n.id === d.target);
            
            const midY = (source.y + target.y) / 2;
            return (Math.abs(source.x - target.x) > Math.abs(source.y - target.y)) 
                ? midY - 10 : midY - 10;
        })
        .attr("width", d => d.label.length * 8)
        .attr("height", 20)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", "white")
        .style("fill-opacity", 0.8);
        
    
    linkElements.append("text")
        .attr("x", d => {
            const source = nodes.find(n => n.id === d.source);
            const target = nodes.find(n => n.id === d.target);
            return (source.x + target.x) / 2;
        })
        .attr("y", d => {
            const source = nodes.find(n => n.id === d.source);
            const target = nodes.find(n => n.id === d.target);
            
            const midY = (source.y + target.y) / 2;
            return (Math.abs(source.x - target.x) > Math.abs(source.y - target.y)) 
                ? midY : midY;
        })
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .text(d => d.label)
        .style("font-size", "14px")
        .style("fill", "#333");
    
    
    const nodeElements = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
    
    
    nodeElements.append("circle")
        .attr("r", 45) 
        .style("fill", d => colorMap[d.type])
        .style("stroke", "#333")
        .style("stroke-width", "2px");
    
    
    nodeElements.append("text")
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(d => d.label)
        .style("font-size", "16px") 
        .style("font-weight", "bold")
        .style("fill", "#fff");
}


function renderWorkflowDiagram() {
    
    d3.select("#workflow-svg").html("");

    const width = 1200;
    const height = 700;

    const svg = d3.select("#workflow-svg")
        .attr("width", width)
        .attr("height", height);
        
    
    svg.append("defs").append("marker")
        .attr("id", "arrowhead-workflow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 14)
        .attr("markerHeight", 14)
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#666");
        
    
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#0f1525");
        
    
    const nodes = [
        { id: "input", label: "Input Date", x: 100, y: 350, type: "input" },
        { id: "preprocess", label: "Preprocesare", x: 250, y: 350, type: "process" },
        { id: "identify", label: "Identificare Criptosistem", x: 400, y: 150, type: "process" }, 
        { id: "analyze", label: "Analiză Statistică", x: 400, y: 550, type: "process" }, 
        { id: "crypto_attack", label: "Atac Criptografic", x: 550, y: 200, type: "process" }, 
        { id: "ai_analysis", label: "Analiză AI", x: 550, y: 500, type: "process" }, 
        { id: "results", label: "Rezultate", x: 700, y: 350, type: "output" },
        { id: "storage", label: "Stocare", x: 850, y: 350, type: "database" },
        { id: "feedback", label: "Feedback", x: 1000, y: 350, type: "process" }
    ];

    
    const links = [
        { source: "input", target: "preprocess", label: "Date brute", labelOffsetY: 0 },
        { source: "preprocess", target: "identify", label: "Date procesate", labelOffsetY: -15 },
        { source: "preprocess", target: "analyze", label: "Date procesate", labelOffsetY: 15 },
        { source: "identify", target: "crypto_attack", label: "", labelOffsetY: -10 },
        { source: "analyze", target: "crypto_attack", label: "Statistici", labelOffsetY: 30 },
        { source: "identify", target: "ai_analysis", label: "Tip criptosistem", labelOffsetY: 25 },
        { source: "analyze", target: "ai_analysis", label: "", labelOffsetY: -10 },
        { source: "crypto_attack", target: "results", label: "Rezultate", labelOffsetY: -20 },
        { source: "ai_analysis", target: "results", label: "Rezultate AI", labelOffsetY: 20 },
        { source: "results", target: "storage", label: "Stocare permanentă", labelOffsetY: 0 },
        { source: "storage", target: "feedback", label: "Date istorice", labelOffsetY: 0 },
        { source: "feedback", target: "preprocess", label: "", labelOffsetY: 30, pathOffsetY: 60 }
    ];

    const colorMap = {
        "input": "#3498db",
        "process": "#2ecc71",
        "output": "#e74c3c",
        "database": "#f39c12"
    };

    
    const linkElements = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("g")
        .attr("class", "link");
        
    
    linkElements.append("path")
        .attr("d", d => {
            const source = nodes.find(n => n.id === d.source);
            const target = nodes.find(n => n.id === d.target);
            
            
            const pathOffsetY = d.pathOffsetY || 0;
            
            
            if (d.source === "feedback" && d.target === "preprocess") {
                return `M${source.x},${source.y} 
                        C${source.x},${source.y + 100} 
                         ${target.x},${target.y + 100} 
                         ${target.x},${target.y}`;
            }
            
            
            if (Math.abs(source.y - target.y) < 80 && Math.abs(source.x - target.x) > 100) {
                
                
                const curveFactor = Math.min(Math.abs(target.x - source.x) * 0.15, 50);
                return `M${source.x},${source.y} 
                        C${source.x + curveFactor},${source.y + pathOffsetY} 
                         ${target.x - curveFactor},${target.y + pathOffsetY} 
                         ${target.x},${target.y}`;
            }
            
            
            if (Math.abs(source.y - target.y) >= 80) {
                const midX = (source.x + target.x) / 2;
                
                
                if (d.source === "preprocess" && d.target === "identify") {
                    return `M${source.x},${source.y} 
                            C${source.x + 50},${source.y - 40} 
                             ${target.x - 50},${target.y + 40} 
                             ${target.x},${target.y}`;
                }
                
                if (d.source === "preprocess" && d.target === "analyze") {
                    return `M${source.x},${source.y} 
                            C${source.x + 50},${source.y + 40} 
                             ${target.x - 50},${target.y - 40} 
                             ${target.x},${target.y}`;
                }
                
                if ((d.source === "identify" && d.target === "ai_analysis") || 
                    (d.source === "analyze" && d.target === "crypto_attack")) {
                    
                    return `M${source.x},${source.y} 
                            C${source.x + 70},${source.y} 
                             ${midX},${(source.y + target.y) / 2} 
                             ${target.x - 70},${target.y} 
                             ${target.x},${target.y}`;
                }
                
                
                return `M${source.x},${source.y} 
                        C${source.x + 50},${source.y} 
                         ${target.x - 50},${target.y} 
                         ${target.x},${target.y}`;
            }
            
            
            return `M${source.x},${source.y} 
                    C${source.x + 60},${source.y} 
                     ${target.x - 60},${target.y} 
                     ${target.x},${target.y}`;
        })
        .style("fill", "none")
        .style("stroke", "#666")
        .style("stroke-width", "2px")
        .attr("marker-end", "url(#arrowhead-workflow)");
    
    
    function getLabelPosition(d, index) {
        const source = nodes.find(n => n.id === d.source);
        const target = nodes.find(n => n.id === d.target);
        
        
        let midX = (source.x + target.x) / 2;
        let midY = (source.y + target.y) / 2;
        
        
        midY += d.labelOffsetY || 0;
        
        
        if (d.source === "feedback" && d.target === "preprocess") {
            midY += 60; 
        }
        
        return { x: midX, y: midY };
    }
    
    
    linkElements.append("rect")
        .attr("x", (d, i) => {
            const pos = getLabelPosition(d, i);
            return pos.x - d.label.length * 4.5;
        })
        .attr("y", (d, i) => {
            const pos = getLabelPosition(d, i);
            return pos.y - 12;
        })
        .attr("width", d => d.label.length * 9)
        .attr("height", 24)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", "rgba(30, 30, 50, 0.9)")
        .style("stroke", "#666")
        .style("stroke-width", "1px")
        .style("filter", "drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.5))");
    
    
    linkElements.append("text")
        .attr("x", (d, i) => getLabelPosition(d, i).x)
        .attr("y", (d, i) => getLabelPosition(d, i).y)
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .text(d => d.label)
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "white");
        
    
    const nodeElements = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`);
        
    
    nodeElements.append("rect")
        .attr("width", 160)
        .attr("height", 55)
        .attr("x", -80)
        .attr("y", -27.5)
        .attr("rx", 10)
        .attr("ry", 10)
        .style("fill", "none")
        .style("stroke", "rgba(255, 255, 255, 0.3)")
        .style("stroke-width", "3px")
        .style("filter", "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))");
        
    
    nodeElements.append("rect")
        .attr("width", 150)
        .attr("height", 50)
        .attr("x", -75)
        .attr("y", -25)
        .attr("rx", 10)
        .attr("ry", 10)
        .style("fill", d => colorMap[d.type])
        .style("stroke", "#333")
        .style("stroke-width", "2px");
        
    
    nodeElements.append("text")
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(d => d.label)
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#fff");
}


renderArchitectureDiagram();