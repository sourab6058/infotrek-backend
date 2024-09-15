const { pool } = require("./index");

exports.initializeDB = async () => {
  const USER = await pool.query(`
        CREATE TABLE public.user_details (
        name character varying(50),
        id uuid NOT NULL,
        email character varying(100),
        password character varying(200),
        role character varying(10) DEFAULT 'user'::character varying,
        dob date DEFAULT '1900-01-01'::date,
        gender character varying(1) DEFAULT 'M'::character varying,
        img_url character varying(200) DEFAULT 'default.jpg'::character varying
);`);

  if (USER) {
    console.log("USER TABLE CREATED/NOT TOUCHED");
  } else {
    throw new Error("Creation of Tables Failed");
  }
  const EVENT_DETAILS = await pool.query(`
        CREATE TABLE public.event_details (
        id uuid NOT NULL,
        name character varying(50),
        description character varying(100),
        date_from date,
        date_to date,
        location character varying(100),
        category character varying(20),
        status character varying(50)
);`);
  if (EVENT_DETAILS) {
    console.log("EVENT_DETAILS TABLE CREATED/NOT TOUCHED");
  } else {
    throw new Error("Creation of Tables Failed");
  }
  const EVENT_REGISTRATIONS = await pool.query(`
        CREATE TABLE public.event_registrations (
        id uuid NOT NULL,
        user_id uuid,
        event_id uuid,
        status character varying(50)
    );


    ALTER TABLE ONLY public.event_registrations
        ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (id);


    ALTER TABLE ONLY public.event_registrations
        ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event_details(id) ON DELETE CASCADE;`);

  if (EVENT_REGISTRATIONS) {
    console.log("EVENT_REGISTRATIONS TABLE CREATED/NOT TOUCHED");
  } else {
    throw new Error("Creation of Tables Failed");
  }
  return true;
};
