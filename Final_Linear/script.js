// ข้อมูลผู้ประกอบการและนักศึกษาฝึกงาน (ข้อมูลตัวอย่าง)
const business = [
    { name: "Alice John", expertise: ["Marketing", "Sales"], image: "1.jpg" },
    { name: "Bob Williams", expertise: ["Design", "Technology"], image: "3.jpg" },
    { name: "Charlie Brown", expertise: ["Finance", "Management"], image: "6.jpg" },
    { name: "Diana Smith", expertise: ["HR", "Operations"], image: "7.jpg" },
    { name: "Eva Martinez", expertise: ["Product Management", "Analytics"], image: "8.jpg" }
    // เพิ่มผู้ประกอบการเพิ่มเติมตามต้องการ
];

const interns = [
    { name: "Jane Johnson", interest: ["Marketing", "Sales"], image: "5.jpg" },
    { name: "Carol Brown", interest: ["Design", "Technology"], image: "4.jpg" },
    { name: "Franklin Lee", interest: ["Finance", "Accounting"], image: "9.jpg" },
    { name: "Grace Taylor", interest: ["Data Science", "Machine Learning"], image: "10.jpg" },
    { name: "Hannah White", interest: ["Digital Marketing", "Content Creation"], image: "2.jpg" }
    // เพิ่มนักศึกษาฝึกงานเพิ่มเติมตามต้องการ
];


// เพิ่มการแสดงข้อมูลนักศึกษาและผู้ประกอบการเริ่มต้น
displayMatch(business[0], interns[0]);

// ฟังก์ชันสำหรับการจับคู่ผู้ประกอบการและนักศึกษาฝึกงาน
function match() {
    const businessIndex = getRandomIndex(business.length);
    const internIndex = getRandomIndex(interns.length);

    const selectedBusiness = business[businessIndex];
    const selectedIntern = interns[internIndex];

    // แสดงผลการจับคู่
    displayMatch(selectedBusiness, selectedIntern);
}

// ฟังก์ชันสำหรับการสุ่มหมายเลขดัชนี
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

// เพิ่มการเรียกใช้ฟังก์ชัน match() เมื่อหน้าเว็บโหลดเสร็จ
window.onload = function() {
    match();
};


// แสดงข้อมูลผู้ประกอบการและนักศึกษาฝึกงาน
function displayMatch(business, intern) {
    document.getElementById("businessName").innerText = business.name;
    document.getElementById("businessExpertise").innerText = "Skill: " + business.expertise.join(", ");
    document.getElementById("businessImage").src = business.image;

    document.getElementById("internName").innerText = intern.name;
    document.getElementById("internInterest").innerText = "Skill: " + intern.interest.join(", ");
    document.getElementById("internImage").src = intern.image;
}

// ฟังก์ชันสำหรับเปิด/ปิดแบบฟอร์มกรอกข้อมูล
function toggleDataForm() {
    var dataForm = document.getElementById('dataEntry');
    if (dataForm.style.display === 'none' || dataForm.style.display === '') {
        dataForm.style.display = 'block';
    } else {
        dataForm.style.display = 'none';
    }
}



// เพิ่มการแสดงข้อมูลเริ่มต้น
displayMatch(business[getRandomIndex(business.length)], interns[getRandomIndex(interns.length)]);

// ฟังก์ชันสำหรับการบันทึกข้อมูล
function saveData() {
    // รับค่าจากแบบฟอร์ม
    var type = document.getElementById('type').value;
    var name = document.getElementById('name').value;
    var skills = document.getElementById('skills').value;
    var image = document.getElementById('image').files[0]; // รับไฟล์รูปภาพที่เลือก

    // สร้างออบเจกต์เพื่อเก็บข้อมูล
    var data = {
        name: name,
        skills: skills,
        image: URL.createObjectURL(image) // เปลี่ยนเป็น URL ของไฟล์รูปภาพ
    };

    // ตรวจสอบประเภทข้อมูลและเพิ่มเข้าในอาร์เรย์ที่เหมาะสม
    if (type === 'business') {
        business.push(data);
    } else if (type === 'intern') {
        interns.push(data);
    }

    // แสดงข้อมูลที่เพิ่มเข้ามาใหม่
    displayNewData(data);

    // ซ่อนกล่องกรอกข้อมูล
    toggleDataForm();

    // สุ่มใหม่เมื่อมีการเพิ่มข้อมูล
    match();
}

// ฟังก์ชันสำหรับแสดงข้อมูลที่เพิ่มมาใหม่
function displayNewData(data) {
    var newDataCard = document.createElement('div');
    newDataCard.className = 'card';

    var nameHeading = document.createElement('h2');
    nameHeading.textContent = data.name;

    var skillsParagraph = document.createElement('p');
    skillsParagraph.textContent = 'Skills: ' + data.skills;

    var imageElement = document.createElement('img');
    imageElement.src = data.image; // ใช้ URL ของรูปภาพที่ได้จากข้อมูล

    newDataCard.appendChild(nameHeading);
    newDataCard.appendChild(imageElement);
    newDataCard.appendChild(skillsParagraph);

    document.querySelector('.container').appendChild(newDataCard);

    // เพิ่มการเรียกใช้ฟังก์ชัน match() เมื่อมีการเพิ่มข้อมูลใหม่
    match();

    // บันทึกข้อมูลลงใน localStorage
    var existingData = JSON.parse(localStorage.getItem('userData')) || { users: [] };
    existingData.users.push(data);
    localStorage.setItem('userData', JSON.stringify(existingData));

    // แจ้งเตือนบันทึกข้อมูลเสร็จสมบูรณ์
    alert('บันทึกข้อมูลเรียบร้อยแล้ว');

    // เปิด/ปิดแบบฟอร์มกรอกข้อมูล
    toggleDataForm();
}

// ฟังก์ชันสำหรับลบข้อมูล
function deleteData(button) {
    var card = button.parentElement; // ดึงข้อมูลการ์ดที่ต้องการลบ
    var cardType = card.id.includes("business") ? "business" : "intern"; // ตรวจสอบประเภทของการ์ด

    // ตรวจสอบประเภทของการ์ดและลบข้อมูลออกจากอาร์เรย์ของข้อมูล
    if (cardType === "business") {
        business.splice(0, 1); // ลบข้อมูลผู้ประกอบการที่อยู่ที่ตำแหน่งแรกของอาร์เรย์
    } else {
        interns.splice(0, 1); // ลบข้อมูลนักศึกษาฝึกงานที่อยู่ที่ตำแหน่งแรกของอาร์เรย์
    }

    card.remove(); // ลบการ์ดที่ต้องการลบออกจาก DOM

    // สุ่มใหม่เมื่อมีการลบข้อมูล
    match();
}


