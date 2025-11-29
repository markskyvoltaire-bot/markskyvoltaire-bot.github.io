// ===== FULL FAMILY TREE JS =====
const ftNodes = [];
const ftMarriages = [];
const personMap = {};

// Build person lookup
nodes.forEach(p => {
    personMap[p.id] = p;
});

// Process nodes
nodes.forEach(p => {
    const parents = [];
    if (p.fid) parents.push(p.fid);
    if (p.mid) parents.push(p.mid);

    if (parents.length === 2) {
        // Two parents → marriage
        const marriageId = `${parents[0]}_${parents[1]}_marriage`;
        let marriage = ftMarriages.find(m => m.id === marriageId);
        if (!marriage) {
            marriage = {
                id: marriageId,
                spouses: parents,
                children: []
            };
            ftMarriages.push(marriage);
        }
        marriage.children.push(p.id);
        ftNodes.push({
            id: p.id,
            name: p.name,
            gender: p.gender
            // No pid because marriage handles layout
        });
    } else if (parents.length === 1) {
        // Single parent → assign pid
        ftNodes.push({
            id: p.id,
            name: p.name,
            gender: p.gender,
            pid: parents[0]
        });
    } else {
        // No parents → root node
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
    root: "@I1@", // center on Mark Voltaire
    template: "hugo",
    enableSearch: true,
    mouseScroll: FamilyTree.scroll.zoom,
    nodeBinding: {
        field_0: "name"
    },
    nodeMenu: {
        details: {
            text: "View Details",
            onClick: nodeId => {
                const p = personMap[nodeId];
                if (!p) return;
                alert(
                    `Name: ${p.name}\n` +
                    `Gender: ${p.gender}\n` +
                    `Birth: ${p.birth || "Unknown"}\n` +
                    `Death: ${p.death || "Unknown"}\n` +
                    `Place of Birth: ${p.pob || "Unknown"}\n` +
                    `Place of Death: ${p.pod || "Unknown"}\n` +
                    `Father ID: ${p.fid || "Unknown"}\n` +
                    `Mother ID: ${p.mid || "Unknown"}`
                );
            }
        }
    }
});

console.log("Family tree loaded successfully");
