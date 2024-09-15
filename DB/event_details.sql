--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2024-09-15 18:43:45

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
-- TOC entry 212 (class 1259 OID 17002)
-- Name: event_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_details (
    id uuid NOT NULL,
    name character varying(50),
    description character varying(100),
    date_from date,
    date_to date,
    location character varying(100),
    category character varying(20),
    status character varying(50)
);


ALTER TABLE public.event_details OWNER TO postgres;

--
-- TOC entry 3318 (class 0 OID 17002)
-- Dependencies: 212
-- Data for Name: event_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_details (id, name, description, date_from, date_to, location, category, status) FROM stdin;
c3de1591-c4ea-4556-8ee2-c191d69175a3	Coding Battle ⚔️	Let's see what you got.	2024-08-31	2024-09-30	Third I, NIT Trichy	Team	Registrations Open
8224c88c-b35d-481d-8b34-331693104349	Snake in my boot 👟🐍	Toy Story based Coding Hackathon.	2024-09-08	2024-09-30	Barn Hall	Individual	Registrations Open
d779a591-bc7c-4e51-a645-ec640af35903	Testing	Testing	2024-09-15	2024-09-30	Testing	Individual	Registrations Open
\.


--
-- TOC entry 3178 (class 2606 OID 17006)
-- Name: event_details event_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_details
    ADD CONSTRAINT event_details_pkey PRIMARY KEY (id);


-- Completed on 2024-09-15 18:43:45

--
-- PostgreSQL database dump complete
--

