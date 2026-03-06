-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist"; -- requis pour EXCLUDE USING gist

-- ─── SALON ───────────────────────────────────────────────────────────────────
CREATE TABLE salon_settings (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           text NOT NULL DEFAULT 'Camavinga House',
  phone          text,
  email          text,
  address        text,
  description    text,
  business_hours jsonb NOT NULL DEFAULT '[]',
  timezone       text NOT NULL DEFAULT 'Europe/Paris',
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

INSERT INTO salon_settings (name) VALUES ('Camavinga House');

-- ─── CATÉGORIES DE PRESTATIONS ───────────────────────────────────────────────
CREATE TABLE service_categories (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        text NOT NULL,
  description text,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── PRESTATIONS ─────────────────────────────────────────────────────────────
CREATE TABLE services (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id  uuid REFERENCES service_categories(id) ON DELETE SET NULL,
  name         text NOT NULL,
  description  text,
  duration_min integer NOT NULL CHECK (duration_min > 0),
  price_cents  integer NOT NULL CHECK (price_cents >= 0),
  currency     text NOT NULL DEFAULT 'EUR',
  is_active    boolean NOT NULL DEFAULT true,
  sort_order   integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- ─── ÉQUIPE ──────────────────────────────────────────────────────────────────
CREATE TABLE staff (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name  text NOT NULL,
  email      text,
  phone      text,
  bio        text,
  avatar_url text,
  color      text NOT NULL DEFAULT '#6366f1',
  is_active  boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Jonction : quelles prestations chaque coiffeur peut effectuer
CREATE TABLE staff_services (
  staff_id   uuid NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (staff_id, service_id)
);

-- ─── PLANNING HEBDOMADAIRE ───────────────────────────────────────────────────
CREATE TABLE staff_schedules (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id    uuid NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Dim, 1=Lun...
  start_time  time NOT NULL,
  end_time    time NOT NULL,
  is_working  boolean NOT NULL DEFAULT true,
  UNIQUE (staff_id, day_of_week)
);

-- ─── EXCEPTIONS DE DISPONIBILITÉ (congés, horaires spéciaux) ─────────────────
CREATE TABLE staff_availability_exceptions (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id       uuid NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  exception_date date NOT NULL,
  is_available   boolean NOT NULL DEFAULT false,
  start_time     time,
  end_time       time,
  reason         text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ─── CLIENTS ─────────────────────────────────────────────────────────────────
CREATE TABLE clients (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name   text NOT NULL,
  last_name    text NOT NULL,
  email        text,
  phone        text NOT NULL,
  phone_e164   text,
  notes        text,
  gdpr_consent boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (phone_e164)
);

-- ─── RENDEZ-VOUS ─────────────────────────────────────────────────────────────
CREATE TYPE appointment_status AS ENUM (
  'pending', 'confirmed', 'cancelled', 'no_show', 'completed'
);

CREATE TABLE appointments (
  id                      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id               uuid NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  staff_id                uuid NOT NULL REFERENCES staff(id) ON DELETE RESTRICT,
  service_id              uuid NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  status                  appointment_status NOT NULL DEFAULT 'confirmed',
  starts_at               timestamptz NOT NULL,
  ends_at                 timestamptz NOT NULL,
  price_cents             integer NOT NULL,
  notes                   text,
  internal_notes          text,
  cancellation_token      uuid DEFAULT uuid_generate_v4(),
  email_reminder_sent_at  timestamptz,
  sms_reminder_sent_at    timestamptz,
  confirmation_sent_at    timestamptz,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now(),

  -- Contrainte anti-double-réservation au niveau base de données
  EXCLUDE USING gist (
    staff_id WITH =,
    tstzrange(starts_at, ends_at, '[)') WITH &&
  ) WHERE (status NOT IN ('cancelled', 'no_show'))
);

CREATE INDEX idx_appointments_starts_at ON appointments (starts_at);
CREATE INDEX idx_appointments_staff_id  ON appointments (staff_id);
CREATE INDEX idx_appointments_client_id ON appointments (client_id);
CREATE INDEX idx_appointments_status    ON appointments (status);

-- ─── LOG DES NOTIFICATIONS ───────────────────────────────────────────────────
CREATE TYPE notification_channel AS ENUM ('email', 'sms');
CREATE TYPE notification_type AS ENUM ('confirmation', 'reminder_24h', 'reminder_2h', 'cancellation');

CREATE TABLE notification_log (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id uuid NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  channel        notification_channel NOT NULL,
  type           notification_type NOT NULL,
  recipient      text NOT NULL,
  external_id    text,
  status         text,
  error_message  text,
  sent_at        timestamptz NOT NULL DEFAULT now()
);
