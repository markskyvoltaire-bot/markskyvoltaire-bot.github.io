// Load your JSON file
fetch('voltaire.json')
    .then(response => response.json())
    .then(data => {
        // Map your JSON to FamilyTreeJS nodes
        const nodes = data.map(person => ({
            id: person.id,
            name: person.name,
            gender: person.sex === "M" ? "male" : "female",
            pid: person.parents.length ? person.parents[0] : null // 'pid' is parent id
        }));

        // Initialize FamilyTreeJS
        const chart = new FamilyTree(document.getElementById('tree'), {
            nodes: nodes,
            template: "hugo",
            enableSearch: true,
            mouseScrool: FamilyTree.scroll.scroll
        });
    })
    .catch(err => console.error("Failed to load JSON:", err));
