// ===== Voltaire Family Tree JS =====

// ===== EMBED YOUR JSON DATA DIRECTLY =====
// Replace this with your full JSON tree
const data = [
    {
        "id": "@I1@",
        "name": "Mark Voltaire",
        "sex": "M",
        "birth": "30 JAN 1975",
        "death": null,
        "parents": [Karl Voltaire, Claire Abgrall],
        "children": []
    },
    {
        "id": "@I2@",
        "name": "Karl Voltaire",
        "sex": "M",
        "birth": "1950",
        "death": null,
        "parents": [Michel Ange Voltaire, Adrienne Anglade],
        "children": [Karl Voltaire]
    },
    {
        "id": "@I3@",
        "name": "Claire Abgrall",
        "sex": "F",
        "birth": "1949",
        "death": null,
        "parents": [Jean Abgrall, Monique Drouaire],
        "children": [Clare Abgrall]
    },
];


// ===== MAP PERSONS =====
const nodes = [];
const marriages = [];
const personMap = {};

// Map each person for quick lookup
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
            let marriage = marriages.find(m => m.id === marriageId);
            if (!marriage) {
                marriages.push({
                    id: marriageId,
                    spouses: parentsIds,
                    children: [person.id]
                });
            } else {
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
