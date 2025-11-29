// ===== FULL FAMILY TREE JS =====
const ftNodes = [];
const ftMarriages = [];
const personMap = {};

// Build person lookup
nodes.forEach(p => {
    personMap[p.id] = p;
});

// Add all people as nodes first
nodes.forEach(p => {
    ftNodes.push({
        id: p.id,
        name: p.name,
        gender: p.gender
    });
});

// Add marriages for people with two parents
nodes.forEach(p => {
    if (p.fid && p.mid) {
        const marriageId = `${p.fid}_${p.mid}_marriage`;
        if (!ftMarriages.find(m => m.id === marriageId)) {
            ftMarriages.push({
                id: marriageId,
                spouses: [p.fid, p.mid],
                children: []
            });
        }
        // Add this person as a child of the marriage
        const marriage = ftMarriages.find(m => m.id === marriageId);
        marriage.children.push(p.id);
    }
});

// Initialize FamilyTree
const chart = new FamilyTree(document.getElementById("tree"), {
    nodes: ftNodes,
    marriages: ftMarriages,
    root: "@I1@", // center on Mark Voltaire
    template: "hugo",
    enableSearch: true,
    mouseScroll: FamilyTree.scroll.zoom,
    nodeBinding: {
        field_0: "name"
    }
});

console.log("Family tree loaded successfully");
