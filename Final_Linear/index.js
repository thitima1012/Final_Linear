let business = [
  { name: "Business 1", skills: ["Marketing", "Finance"] },
  { name: "Business 2", skills: ["Product Development", "Sales"] },
  { name: "Business 3", skills: ["Technology", "Strategy"] },
];

let interns = [
  { name: "Intern 1", skills: ["Marketing", "Design"] },
  { name: "Intern 2", skills: ["Finance", "Technology"] },
  { name: "Intern 3", skills: ["Sales", "Strategy"] },
];

// ฟังก์ชันสำหรับเพิ่มข้อมูลของผู้ประกอบการ
function addBusiness() {
    let newBusiness = {
        name: "Business " + (business.length + 1),
        skills: generateSkills()
    };
    business.push(newBusiness);
    matchPairs();
}

// ฟังก์ชันสำหรับลบข้อมูลของผู้ประกอบการ
function removeBusiness() {
    if (business.length > 0) {
        business.pop();
        matchPairs();
    }
}

// ฟังก์ชันสำหรับเพิ่มข้อมูลของนักศึกษาฝึกงาน
function addIntern() {
    let newIntern = {
        name: "Intern " + (interns.length + 1),
        skills: generateSkills()
    };
    interns.push(newIntern);
    matchPairs();
}

// ฟังก์ชันสำหรับลบข้อมูลของนักศึกษาฝึกงาน
function removeIntern() {
    if (interns.length > 0) {
        interns.pop();
        matchPairs();
    }
}
// สร้างฟังก์ชันสำหรับสร้างข้อมูลของผู้ประกอบการและนักศึกษาฝึกงาน
function generateData() {
    let businesses = [];
    let interns = [];

    // สร้างข้อมูลสำหรับผู้ประกอบการ
    for (let i = 1; i <= 5; i++) {
        let business = {
            name: "Business " + i,
            skills: generateSkills()
        };
        businesses.push(business);
    }

    // สร้างข้อมูลสำหรับนักศึกษาฝึกงาน
    for (let i = 1; i <= 5; i++) {
        let intern = {
            name: "Intern " + i,
            skills: generateSkills()
        };
        interns.push(intern);
    }

    // สุ่มความถนัดของนักศึกษาฝึกงานในแต่ละด้าน
    interns.forEach(intern => {
        intern.skills = shuffleArray(["Marketing", "Finance", "Product Development", "Sales", "Technology", "Design", "Strategy"]);
    });

    return { businesses, interns };
}


// สร้างฟังก์ชันสำหรับสร้างความถนัด (skills) ของผู้ประกอบการและนักศึกษาฝึกงาน
function generateSkills() {
    let skills = ["Marketing", "Finance", "Product Development", "Sales", "Technology", "Design", "Strategy"];
    let numSkills = Math.floor(Math.random() * (skills.length - 1)) + 1; // สุ่มจำนวนความถนัด
    let shuffledSkills = shuffleArray(skills); // สุ่มลำดับของความถนัด
    return shuffledSkills.slice(0, numSkills); // เลือกความถนัดจากการสุ่ม
}

// สร้างฟังก์ชันสำหรับสุ่มลำดับของอาร์เรย์
// สุ่มลำดับของอาร์เรย์
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// สร้างข้อมูลสำหรับผู้ประกอบการ
function generateBusinesses() {
    let businesses = [];

    for (let i = 1; i <= 5; i++) {
        let business = {
            name: "Business " + i,
            skills: generateSkills()
        };
        businesses.push(business);
    }

    return businesses;
}

// สร้างข้อมูลสำหรับนักศึกษาฝึกงาน
function generateInterns() {
    let interns = [];

    for (let i = 1; i <= 5; i++) {
        let intern = {
            name: "Intern " + i,
            skills: generateSkills()
        };
        interns.push(intern);
    }

    return interns;
}

// สร้างความถนัดสำหรับแต่ละบุคคลโดยการสุ่ม
function generateSkills() {
    let skills = ["Marketing", "Finance", "Product Development", "Sales", "Technology", "Design", "Strategy"];
    let numSkills = Math.floor(Math.random() * (skills.length - 1)) + 1;
    let shuffledSkills = shuffleArray(skills);
    return shuffledSkills.slice(0, numSkills);
}

// สร้างข้อมูลระหว่างผู้ประกอบการกับนักศึกษาฝึกงาน
function matchPairs() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let businesses = generateBusinesses();
    let interns = generateInterns();

    businesses.forEach(business => {
        let suitableInterns = interns.filter(intern => {
            return intern.skills.some(skill => business.skills.includes(skill));
        });

        if (suitableInterns.length > 0) {
            let businessLi = document.createElement("li");
            businessLi.textContent = business.name + " can be paired with: ";
            let internUl = document.createElement("ul");

            suitableInterns.forEach(intern => {
                let internLi = document.createElement("li");
                internLi.textContent = intern.name;
                internUl.appendChild(internLi);
            });

            businessLi.appendChild(internUl);
            output.appendChild(businessLi);
        }
    });
}

matchPairs();


// ฟังก์ชันสำหรับจับคู่ระหว่างผู้ประกอบการและนักศึกษาฝึกงาน
function matchPairs() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    let { businesses, interns } = generateData();

    let table = document.createElement("table");
    table.classList.add("table");

    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");

    let thBusiness = document.createElement("th");
    thBusiness.textContent = "Business";
    trHead.appendChild(thBusiness);

    let thIntern = document.createElement("th");
    thIntern.textContent = "Intern";
    trHead.appendChild(thIntern);

    thead.appendChild(trHead);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");

    businesses.forEach((business) => {
        let suitableInterns = interns.filter((intern) => {
            return intern.skills.some((skill) => business.skills.includes(skill));
        });

        if (suitableInterns.length > 0) {
            suitableInterns.forEach((intern) => {
                let trBody = document.createElement("tr");

                let tdBusiness = document.createElement("td");
                tdBusiness.textContent = business.name;
                trBody.appendChild(tdBusiness);

                let tdIntern = document.createElement("td");
                tdIntern.textContent = intern.name + " (Intern) is " + intern.skills.join(', ');
                trBody.appendChild(tdIntern);

                tbody.appendChild(trBody);
            });
        }
    });
    table.appendChild(tbody);
    output.appendChild(table);
}
// เพิ่มฟังก์ชันสำหรับเพิ่มข้อมูลของผู้ประกอบการด้วยข้อมูลที่กรอกเข้ามา
function addBusinessWithInput() {
    let newBusinessName = document.getElementById("newBusinessName").value;
    if (newBusinessName.trim() === "") {
        alert("Please enter a business name.");
        return;
    }

    let newBusiness = {
        name: newBusinessName,
        skills: generateSkills()
    };
    businesses.push(newBusiness);
    matchPairs();
}

// เรียกใช้ฟังก์ชัน matchPairs เพื่อแสดงผลแบบสุ่มเริ่มต้น
matchPairs();
