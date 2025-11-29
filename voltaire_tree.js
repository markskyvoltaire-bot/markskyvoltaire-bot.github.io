// ===== Voltaire Family Tree JS =====

// ===== EMBED YOUR JSON DATA DIRECTLY =====
const data = [
    {
        "id": "I1",
        "name": "John Voltaire",
        "sex": "M",
        "parents": [],
        "children": ["I2", "I3"]
    },
    {
        "id": "I2",
        "name": "Mark Voltaire",
        "sex": "M",
        "parents": ["I1"],
        "children": []
    },
    {
        "id": "I3",
        "name": "Kandi Voltaire",
        "sex": "F",
        "parents": ["I1"],
        "children": []
    }
    // ADD THE REST OF YOUR TREE HERE
];

// ===== MAP PERSONS =====
const nodes = [];
const marriages = [];
const personMap = {};

// First, map each person for quick lookup
data.forEach(person => {
    personMap[person.id] = {
        id: person.id,
        name: person.name,
        gender: person.sex === "M" ? "male" : "female"
    };
});

// ===== CREATE NODES AND MARRIAGES =====
data.forEach(person => {
    if (person.parents.length > 0) {
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

            // Check if marriage already exists
            if (!marriages.find(m => m.id === marriageId)) {
                marriages.push({
                    id: marriageId,
                    spouses: parentsIds,
                    children: [person.id]
                });
            } else {
                // Add child to existing marriage
                const marriage = marriages.find(m => m.id === marriageId);
                marriage.children.push(person.id);
            }
        }
    } else {
        // No parents, root node
        nodes.push({
            id: person.id,
            name: person.name,
            gender: person.sex === "M" ? "male" : "female"
        });
    }
});

// ===== INITIALIZE FAMILYTREE =====
const chart = new FamilyTree(document.getElementById('tree'), {
    nodes: nodes,
    marriages: marriages,
    template: "hugo",
    enableSearch: true,
    mouseScroll: FamilyTree.scroll.scroll
});

console.log("Family tree loaded successfully");
