// ข้อมูลผู้ประกอบการและนักศึกษาฝึกงาน
const business = [
    { name: "John Doe", expertise: ["Marketing", "Finance"] },
    { name: "Jane Smith", expertise: ["Technology", "Engineering"] },
    // เพิ่มข้อมูลผู้ประกอบการตามต้องการ
];

const interns = [
    { name: "Jane Johnson", interest: ["Marketing", "Sales"]},
    { name: "Carol Brown", interest: ["Design", "Technology"]},
    // เพิ่มข้อมูลนักศึกษาฝึกงานตามต้องการ
];

// ฟังก์ชันสำหรับจับคู่
function match() {
    const matchedPairs = [];

    // จับคู่แบบสุ่ม
    for (let i = 0; i < business.length; i++) {
        const business = business[i];
        const internIndex = Math.floor(Math.random() * interns.length);
        const intern = interns.splice(internIndex, 1)[0];
        matchedPairs.push({ business, intern });
    }

    displayMatches(matchedPairs);
}

// ฟังก์ชันสำหรับแสดงผลการจับคู่
function displayMatches(matches) {
    const container = document.getElementById("matching-container");
    container.innerHTML = ""; // ล้างค่าเก่า

    matches.forEach((match, index) => {
        const matchElement = document.createElement("div");
        matchElement.classList.add("match");
        matchElement.innerHTML = `
            <h2>Match ${index + 1}</h2>
            <p><strong>Business:</strong> ${match.business.name}</p>
            <p><strong>Business:</strong> ${match.business.expertise.join(", ")}</p>
            <p><strong>Intern:</strong> ${match.intern.name}</p>
            <p><strong>Interest:</strong> ${match.intern.interest.join(", ")}</p>
            <!-- เพิ่มรูปภาพถ้าต้องการ -->
        `;
        container.appendChild(matchElement);
    });
}

// ส่วนของโค้ด Node.js
const fs = require('fs').promises;

// อ่านไฟล์ JSON
fs.readFile('data.json', 'utf8')
    .then(data => {
        // แปลงข้อมูล JSON ให้อยู่ในรูปแบบของ JavaScript object
        const jsonData = JSON.parse(data);

        // ข้อมูลที่ต้องการเพิ่ม
        const newData = {
            id: 3,
            name: "Bob",
            skills: ["React", "Node.js", "MongoDB"],
            image: "bob.jpg"
        };

        // เพิ่มข้อมูลใหม่ลงในอาเรย์ข้อมูล JSON
        jsonData.users.push(newData);

        // แปลงข้อมูลเป็น JSON และบันทึกลงในไฟล์ JSON เดิม
        return fs.writeFile('data.json', JSON.stringify(jsonData, null, 2));
    })
    .then(() => {
        console.log('เพิ่มข้อมูลเรียบร้อยแล้ว');
    })
    .catch(err => {
        console.error(err);
    });

// ฟังก์ชันสำหรับบันทึกข้อมูล
function saveData() {
    // รับค่าจากฟอร์ม
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var skills = document.getElementById('skills').value;
    var image = document.getElementById('image').files[0]; // รับไฟล์รูปที่เลือก

    // เตรียมข้อมูล
    var data = {
        id: id,
        name: name,
        skills: skills,
        image: image.name // เก็บชื่อไฟล์รูป
    };

    // บันทึกข้อมูลลงใน localStorage
    var existingData = JSON.parse(localStorage.getItem('userData')) || { users: [] };
    existingData.users.push(data);
    localStorage.setItem('userData', JSON.stringify(existingData));

    alert('บันทึกข้อมูลเรียบร้อยแล้ว');

    // สร้าง JSON data
    var jsonData = JSON.stringify(existingData);

    // สร้าง Blob จาก JSON data
    var blob = new Blob([jsonData], {type: "application/json"});

    // สร้าง URL สำหรับ Blob
    var url = URL.createObjectURL(blob);

    // สร้าง element link
    var a = document.createElement("a");
    a.href = url;
    a.download = "Data.json";
    document.body.appendChild(a);

    // คลิกลิงค์เพื่อดาวน์โหลดไฟล์ JSON
    a.click();

    // ทำความสะอาด
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

