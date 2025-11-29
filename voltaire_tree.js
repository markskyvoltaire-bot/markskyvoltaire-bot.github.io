// ===== Voltaire Family Tree JS =====

// ===== FAMILY DATA (CLEANED + READY FOR EXPANSION) =====
const data = [
    {
        id: "@I1@",
        name: "Mark Voltaire",
        sex: "M",
        birth: "30 JAN 1975",
        death: null,
        parents: ["@I2@", "@I3@"],
        children: []
    },
    {
        id: "@I2@",
        name: "Karl Voltaire",
        sex: "M",
        birth: "1950",
        death: null,
        parents: ["@I7@", "@I8@"],
        children: ["@I1@"]
    },
    {
        id: "@I3@",
        name: "Claire Abgrall",
        sex: "F",
        birth: "1949",
        death: null,
        parents: ["@I5@", "@I6@"],
        children: ["@I1@"]
    }
];

// ===== MAP PERSONS =====
const nodes = [];
const marriages = [];
const personMap = {};

// Create person lookup
data.forEach(person => {
    personMap[person.id] = person;
});

// ===== BUILD TREE STRUCTURE =====
data.forEach(person => {
    // If no parents → root
    if (!person.parents || person.parents.length === 0) {
        nodes.push({
            id: person.id,
            name: person.name,
            gender: person.sex === "M" ? "male" : "female",
        });
        return;
    }

    // Handle parents
    const validParents = person.parents.filter(p => personMap[p]);

    if (validParents.length === 1) {
        nodes.push({
            id: person.id,
            name: person.name,
            gender: person.sex === "M" ? "male" : "female",
            pid: validParents[0]
        });
    }

    if (validParents.length === 2) {
        const marriageId = `${validParents[0]}_${validParents[1]}_marriage`;
        let marriage = marriages.find(m => m.id === marriageId);

        if (!marriage) {
            marriages.push({
                id: marriageId,
                spouses: validParents,
                children: [person.id]
            });
        } else {
            marriage.children.push(person.id);
        }
    }
});

// ===== FAMILY TREE INIT =====
const chart = new FamilyTree(document.getElementById("tree"), {
    nodes: nodes,
    marriages: marriages,
    template: "hugo",
    root: "@I1@", // CENTER YOU AT START
    enableSearch: true,
    mouseScroll: FamilyTree.scroll.zoom,
    nodeBinding: {
        field_0: "name", // SHOW NAME ON BOXES
    },
    // ===== HOVER CARD (INFO POPUP) =====
    nodeMenu: {
        details: { text: "View Details", onClick: showDetails }
    }
});

// ===== POPUP FUNCTION (CAN EXPAND LATER) =====
function showDetails(nodeId) {
    const p = personMap[nodeId];
    alert(
        `Name: ${p.name}\n` +
        `Sex: ${p.sex === "M" ? "Male" : "Female"}\n` +
        `Born: ${p.birth || "Unknown"}\n` +
        `Died: ${p.death || "Still living"}`
    );
}

console.log("Family tree loaded successfully");
