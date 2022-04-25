# tubes-stima-3

## Cara Pakai

start backend local server

1. ```
   cd be
   ```
2. ```
   npm install
   ```
3. ```
   npm start
   ```

start frontend local server

1. ```
   cd fe
   ```
2. ```
   npm install
   ```
3. ```
   npm start
   ```

start local database server on Postgresql

1. install [Postgre](https://www.postgresql.org/download/)
2. setup password asdfgh jika diganti maka ganti password di be/routes/database.js
3. buat database data_stima jika diganti maka ganti database di be/routes/database/js
4. buat table dengan query berikut

   `CREATE TABLE penyakit( id serial PRIMARY KEY, nama VARCHAR (255), rantai text ); `

   `CREATE TABLE HISTORY_DNA( id serial PRIMARY KEY, nama_pengguna VARCHAR (255) NOT NULL, nama_penyakit VARCHAR (255) NOT NULL, tanggal_test DATE DEFAULT CURRENT_DATE, hasil BOOLEAN NOT NULL );`

5. pastikan user, host, database, password, dan port sesuai dengan konfigurasi di PostgreSQL anda!
