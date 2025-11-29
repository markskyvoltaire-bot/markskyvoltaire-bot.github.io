// ===== Voltaire Family Tree JS (FOR INLINE HTML) =====

// Grab the nodes from the HTML-defined array
const nodesData = nodes; // 'nodes' comes from your HTML inline array

// Prepare FamilyTree nodes and marriages
const ftNodes = [];
const ftMarriages = [];
const personMap = {};

// Build person lookup
nodesData.forEach(p => {
    personMap[p.id] = p;
});

// Build nodes and marriages for FamilyTree
nodesData.forEach(p => {
    const parents = [];
    if (p.fid) parents.push(p.fid);
    if (p.mid) parents.push(p.mid);

    if (parents.length === 2) {
        // Two parents → marriage
        const marriageId = `${parents[0]}_${parents[1]}_marriage`;
        let marriage = ftMarriages.find(m => m.id === marriageId);
        if (!marriage) {
            ftMarriages.push({
                id: marriageId,
                spouses: parents,
                children: [p.id]
            });
        } else {
            marriage.children.push(p.id);
        }
    } else if (parents.length === 1) {
        // Single parent
        ftNodes.push({
            id: p.id,
            name: p.name,
            gender: p.gender,
            pid: parents[0]
        });
    } else {
        // No parents → root
        ftNodes.push({
            id: p.id,
            name: p.name,
            gender: p.gender
        });
    }
});

// Initialize FamilyTree
const chart = new FamilyTree(document.getElementById("tree"), {
    nodes: ftNodes,
    marriages: ftMarriages,
    template: "hugo",
    root: "@I1@",       // center on Mark Voltaire
    enableSearch: true,
    mouseScroll: FamilyTree.scroll.zoom,
    nodeBinding: {
        field_0: "name" // show names on boxes
    },
    nodeMenu: {
        details: {
            text: "View Details",
            onClick: showDetails
        }
    }
});

// Popup function
function showDetails(nodeId) {
    const p = personMap[nodeId];
    if (!p) return;
    alert(
        `Name: ${p.name}\n` +
        `Gender: ${p.gender === "male" ? "Male" : "Female"}\n` +
        `Father ID: ${p.fid || "Unknown"}\n` +
        `Mother ID: ${p.mid || "Unknown"}`
    );
}

console.log("Family tree loaded successfully");
