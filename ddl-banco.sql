CREATE USER nekicard WITH SUPERUSER PASSWORD 'neki123@';


CREATE TABLE roles (
	CONSTRAINT roles_pkey PRIMARY KEY (rol_cd_id),
	CONSTRAINT roles_rol_tx_name_check CHECK (((rol_tx_name)::text = ANY ((ARRAY['ROLE_USER'::character varying, 'ROLE_MODERATOR'::character varying, 'ROLE_ADMIN'::character varying])::text[])))
);



CREATE TABLE user_roles (
	CONSTRAINT user_roles_pkey PRIMARY KEY (role_id, user_id)
);



CREATE TABLE users (
	usr_cd_id serial4 NOT NULL,
	usr_tx_email varchar(50) NULL,
	usr_tx_username varchar(50) NULL,
	usr_tx_password varchar(120) NULL,
	CONSTRAINT ukb244kaj5cls36d7jdf3igfxp6 null,
	CONSTRAINT ukrvfmtx4eapewnj62lsoy037j7 null,
	CONSTRAINT users_pkey null
);


CREATE TABLE colaboradores (
	col_bl_ativo bool NULL,
	col_dt_data_nascimento date NOT NULL,
	col_cd_id bigserial NOT NULL,
	col_tx_email varchar(255) NOT NULL,
	col_tx_facebook varchar(255) NULL,
	col_tx_foto varchar(255) NOT NULL,
	col_tx_github varchar(255) NULL,
	col_tx_instagram varchar(255) NULL,
	col_tx_linkedin varchar(255) NULL,
	col_tx_nome_completo varchar(255) NOT NULL,
	col_tx_nome_social varchar(255) NULL,
	col_tx_telefone varchar(255) NULL,
	user_usr_cd_id int4 NULL,
	CONSTRAINT colaboradores_pkey null,
	CONSTRAINT uk_2fks8kuqy0v8pukuxsi6s9hvi null,
	CONSTRAINT fkds8lewn2qm9tcxugf1t29t108 FOREIGN KEY (user_usr_cd_id) REFERENCES users(usr_cd_id)
);

