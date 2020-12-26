# **19HCB-QLQTPM**
Dành cho môn quản lí quy trình phần mềm

# **TEAM BACKEND** 
## **Cách chạy project**
### **Yêu cầu**:
1. NodeJS phiên bản 10
2. Cài đặt database
    + Cài knex trên máy bằng lệnh "npm install knex --global".
    + Cài đặt MySQL (https://www.mysql.com/downloads/).
    + Chỉnh sửa config trong file "config/db.js" cho phù hợp với cài đặt trên máy.
    + Tạo database "SmartEasyTravel".
    + Chạy lệnh "knex migrate:latest" để tạo tables.
3. Chạy lệnh npm install
4. Chạy lệnh npm start

### API documentations:
1. Cài đặt apidoc trên máy (https://apidocjs.com/)
2. Chạy lệnh apidoc -i ./routes -o ./apidocs
1. Vào thư mục apidocs
2. Mở file index.html để xem document của API