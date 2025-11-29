// Load your JSON file
fetch('voltaire.json')
    .then(response => response.json())
    .then(data => {
        // Map your JSON to FamilyTreeJS nodes
        const nodes = data.map(person => ({
            id: person.id,
            name: person.name,
            gender: person.sex === "M" ? "male" : "female",
            pid: person.parents.length > 0 ? person.parents[0] : null // Only first parent for now
        }));

        // Initialize FamilyTreeJS
        const chart = new FamilyTree(document.getElementById('tree'), {
            nodes: nodes,
            template: "hugo",
            enableSearch: true,
            mouseScroll: FamilyTree.scroll.scroll // fixed typo
        });
    })
    .catch(err => console.error("Failed to load JSON:", err));
