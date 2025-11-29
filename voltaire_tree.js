// Load your JSON file
fetch('voltaire.json')
    .then(response => response.json())
    .then(data => {
        const nodes = [];
        const marriages = [];

        // Map each person
        const personMap = {};
        data.forEach(person => {
            personMap[person.id] = {
                id: person.id,
                name: person.name,
                gender: person.sex === "M" ? "male" : "female"
            };
        });

        // Add children and parent links
        data.forEach(person => {
            // If the person has parents, create a "marriage" linking the parents to children
            if (person.parents.length > 0) {
                // FamilyTreeJS supports one parent as pid; for both parents, we define a marriage node
                const parentsIds = person.parents.filter(p => personMap[p]);
                if (parentsIds.length === 1) {
                    // Single parent case
                    nodes.push({
                        id: person.id,
                        name: person.name,
                        gender: person.sex === "M" ? "male" : "female",
                        pid: parentsIds[0]
                    });
                } else if (parentsIds.length === 2) {
                    // Two parents, create a marriage node
                    const marriageId = `${parentsIds[0]}_${parentsIds[1]}_marriage`;
                    marriages.push({
                        id: marriageId,
                        spouses: parentsIds,
                        children: [person.id]
                    });
                }
            } else {
                // No parents, just add as a root node
                nodes.push({
                    id: person.id,
                    name: person.name,
                    gender: person.sex === "M" ? "male" : "female"
                });
            }
        });

        // Initialize FamilyTreeJS
        const chart = new FamilyTree(document.getElementById('tree'), {
            nodes: nodes,
            marriages: marriages, // link both parents if possible
            template: "hugo",
            enableSearch: true,
            mouseScroll: FamilyTree.scroll.scroll
        });
    })
    .catch(err => console.error("Failed to load JSON:", err));
