// ===== FULL FAMILY TREE JS (UPDATED) =====
const ftNodes = [];
const ftMarriages = [];
const personMap = {};

// Build person lookup
nodes.forEach(p => {
    personMap[p.id] = p;
});

// Ensure unknown parents exist for nodes missing one parent
let unknownCounter = 1;
nodes.forEach(p => {
    if (!p.fid) {
        p.fid = `@UNKNOWNF${unknownCounter}@`;
        // Add unknown father node if not already added
        if (!personMap[p.fid]) {
            const unknownFather = {
                id: p.fid,
                name: "Unknown Father",
                gender: "male",
                birth: null,
                death: null,
                pob: null,
                pod: null
            };
            nodes.push(unknownFather);
            personMap[unknownFather.id] = unknownFather;
        }
        unknownCounter++;
    }
    if (!p.mid) {
        p.mid = `@UNKNOWNM${unknownCounter}@`;
        if (!personMap[p.mid]) {
            const unknownMother = {
                id: p.mid,
                name: "Unknown Mother",
                gender: "female",
                birth: null,
                death: null,
                pob: null,
                pod: null
            };
            nodes.push(unknownMother);
            personMap[unknownMother.id] = unknownMother;
        }
        unknownCounter++;
    }
});

// Build nodes and marriages
nodes.forEach(p => {
    const parents = [];
    if (p.fid) parents.push(p.fid);
    if (p.mid) parents.push(p.mid);

    if (parents.length === 2) {
        // Two parents → marriage
        const marriageId = `${parents[0]}_${parents[1]}_marriage`;
        let marriage = ftMarriages.find(m => m.id === marriageId);
        if (!marriage) {
            marriage = { id: marriageId, spouses: parents, children: [] };
            ftMarriages.push(marriage);
        }
        marriage.children.push(p.id);

        ftNodes.push({
            id: p.id,
            name: p.name,
            gender: p.gender,
            birth: p.birth,
            death: p.death,
            pob: p.pob,
            pod: p.pod
            // pid not needed because marriage handles layout
        });
    } else {
        // Safety fallback (shouldn't happen) → root node
        ftNodes.push({
            id: p.id,
            name: p.name,
            gender: p.gender,
            birth: p.birth,
            death: p.death,
            pob: p.pob,
            pod: p.pod
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
