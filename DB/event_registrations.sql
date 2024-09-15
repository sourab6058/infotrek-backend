--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2024-09-15 18:46:02

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
-- TOC entry 213 (class 1259 OID 17014)
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_registrations (
    id uuid NOT NULL,
    user_id uuid,
    event_id uuid,
    status character varying(50)
);


ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event_details(id) ON DELETE CASCADE;


--
-- TOC entry 3179 (class 2606 OID 17019)
-- Name: event_registrations event_registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_details(id);


-- Completed on 2024-09-15 18:46:02

--
-- PostgreSQL database dump complete
--

