--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2024-09-15 18:40:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16972)
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    name character varying(50),
    id uuid NOT NULL,
    email character varying(100),
    password character varying(200),
    role character varying(10) DEFAULT 'user'::character varying,
    dob date DEFAULT '1900-01-01'::date,
    gender character varying(1) DEFAULT 'M'::character varying,
    img_url character varying(200) DEFAULT 'default.jpg'::character varying
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- TOC entry 3324 (class 0 OID 16972)
-- Dependencies: 209
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_details (name, id, email, password, role, dob, gender, img_url) FROM stdin;
sourab kumar	7589b300-47f6-4829-9611-1e200574eabf	sourab@email.com	$2b$12$jyvVlylNoC.yKexW7f7ccei5JAwgwEcRcW.jAowV0Ke9bSIPIwcui	admin	2001-08-11	F	default.png
sourab	eed6836b-704f-435d-a306-70f841ebf49a	sourab123@gmail.com	$2b$12$ULgMAmyRLnWl.lZDvARC/eKjYxbuj7baqpAcHNRjV.FUivuYWCt1.	user	1900-01-01	M	default.png\n
new	6c0b6bb5-01eb-4e3d-aea5-a0995ede8274	new@email.com	$2b$12$C6FMByomyvNvE1gaByk3Ae/Bf5e.1ie.V3bKf2lv612EPqirhW/6.	user	1900-01-01	F	1726377101563_6c0b6bb5-01eb-4e3d-aea5-a0995ede8274
sourab	22501670-27f9-4bdb-b17e-325a3f001d50	sourab12345@gmail.com	$2b$12$cDOCDQa.k3L0TlCSib9D8.p0APEqbtmCyln2.PsizRimieqeW5R/S	user	2001-08-11	F	1726402767498_22501670-27f9-4bdb-b17e-325a3f001d50
\.


--
-- TOC entry 3182 (class 2606 OID 16979)
-- Name: user_details user_details_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_email_key UNIQUE (email);


--
-- TOC entry 3184 (class 2606 OID 16977)
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);


-- Completed on 2024-09-15 18:40:35

--
-- PostgreSQL database dump complete
--

