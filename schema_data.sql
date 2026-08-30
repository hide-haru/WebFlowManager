/*
	データベース作成
*/
create database sukemage
with
    template = template0
    encoding = 'UTF-8'
    lc_collate = 'C'
    lc_ctype = 'C';


/*
	テーブル作成
*/
create table user_mst (
	id int generated always as identity unique,
	user_id varchar(50) primary key not null,
	name varchar(100) not null,
	password varchar(255) not null,
	updated_at timestamptz
);

create table pagename_mst (
	id int generated always as identity unique,
	page_id Integer primary key not null,
	page_name varchar(50) not null,
	page_path varchar(255),
	updated_at timestamptz default current_timestamp
);

create table reservation_dat (
	id int generated always as identity unique primary key,
	u_id int not null references user_mst(id),
	title varchar(255),
	description varchar(500),
	start_datetime timestamptz not null,
	end_datetime timestamptz not null
);

create table client_dat (
	id int generated always as identity unique,
	client_code int not null primary key,
	client_name varchar(100) not null,
	pic varchar(100),
	tel varchar(20),
	address varchar(255),
	contract_day timestamptz,
	updated_at timestamptz
);

create table clientdetail_dat (
	id int generated always as identity unique primary key,
	client_code int not null references client_dat(client_code),
	category varchar(50),
	title varchar(255),
	memo text,
	work_starttime timestamptz,
	work_endtime timestamptz,
	report_creator int,
	report_relation varchar(255),
	created_at timestamptz default current_timestamp,
	updated_at timestamptz
);

create table reportlayout_mst (
	id int generated always as identity unique,
	report_code bigint not null primary key,
	report_name varchar(100) not null,
	updated_at timestamptz default current_timestamp
);

create table reportlayoutdetail_mst (
	id int generated always as identity unique primary key,
	report_code bigint not null references reportlayout_mst(report_code),
	detail_id bigint not null,
	input_type varchar(50),
	type varchar(50),
	label varchar(255),
	text varchar(255),
	x int,
	y int,
	height int,
	width int
);

create table report_dat (
	report_id bigint not null primary key,
	report_code bigint not null references reportlayout_mst(report_code),
	report_creator int not null references user_mst(id),
	clientdetail_id int references clientdetail_dat(id),
	updated_at timestamptz default current_timestamp
);

create table report_detail_dat (
	id int generated always as identity unique primary key,
	report_id bigint references report_dat(report_id),
	input_code bigint,
	input_name text
);


/*
	データ作成
*/
insert into reservation_dat (
	u_id, title, description, start_datetime, end_datetime)
values (2, '会議', '部署内進捗ミーティング', '2026-08-21T10:00:00', '2026-08-21T11:00:00')
,(2, '打合せ', 'A社との契約打ち合わせ', '2026-08-21T14:00:00', '2026-08-21T15:30:00')
,(1, '訪問', 'C社', '2026-08-10T10:30:00', '2026-08-10T11:30:00')

insert into pagename_mst (
	page_id, page_name, page_path)
values (10, 'スケジュール', '/calendar')
,(20, 'クライアント一覧', '/clientlist')
,(30, '帳票レイアウト作成', '/reportlayout')

insert into client_dat (
	client_code, client_name, pic, tel, address, contract_day, updated_at)
values (10, 'A株式会社', '山田 太郎', '001-0000-0000', '大阪府大阪市XXXXX XXX-XX-XX', '2025-09-01', '2026-02-10 10:20:21')
,(20, 'B株式会社', '佐藤 二郎', '002-1111-1111', '東京都新宿区XXXXX XXX-XX-XX', '2025-11-25', '2026-06-09 14:50:36')

insert into clientdetail_dat (
	client_code, category, title, memo, work_starttime, work_endtime, report_creator, report_relation)
values (10, '作業', 'テスト作業', 'テストメモテストメモテストメモテストメモテストメモ', '2026-08-20 15:00', '2026-08-20 16:00', 1, '')
,(20, '作業2', 'テスト作業2', 'テスト2メモテスト2メモテスト2メモテスト2メモテスト2メモ', '2026-08-22 10:00', '2026-08-22 17:00', 1, '')
,(10, '作業3', 'テスト作業2', 'テスト2メモテスト2メモテスト2メモテスト2メモテスト2メモ', '2026-08-22 10:00', '2026-08-22 17:00', 1, '')
