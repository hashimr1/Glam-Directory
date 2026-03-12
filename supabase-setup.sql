-- =========================================
-- Glam Directory — Complete Database Setup
-- =========================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- =========================================

-- USERS
create table users (
  id uuid references auth.users(id) on delete cascade primary key,
  type text check (type in ('client', 'artist')) default 'client',
  name text not null,
  avatar_url text,
  has_completed_onboarding boolean default false,
  created_at timestamp with time zone default now()
);

-- ARTISTS
create table artists (
  id uuid references users(id) on delete cascade primary key,
  location text,
  bio text,
  specialties text[],
  portfolio_urls text[],
  rating numeric(3,2) default 0,
  review_count int default 0,
  price_from numeric(10,2),
  created_at timestamp with time zone default now()
);

-- SERVICES
create table services (
  id uuid default gen_random_uuid() primary key,
  artist_id uuid references artists(id) on delete cascade,
  name text not null,
  price numeric(10,2) not null,
  duration_minutes int,
  created_at timestamp with time zone default now()
);

-- BOOKINGS
create table bookings (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references users(id) on delete cascade,
  artist_id uuid references artists(id) on delete cascade,
  date date not null,
  event_type text,
  location text,
  guest_count int default 1,
  notes text,
  status text check (status in (
    'pending', 'quoted', 'confirmed', 'declined', 'completed'
  )) default 'pending',
  created_at timestamp with time zone default now()
);

-- QUOTES
create table quotes (
  id uuid default gen_random_uuid() primary key,
  booking_id uuid references bookings(id) on delete cascade unique,
  message text,
  total numeric(10,2),
  items jsonb,  -- [{ "name": "...", "price": 00.00 }]
  created_at timestamp with time zone default now()
);

-- SAVED ARTISTS
create table saved_artists (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references users(id) on delete cascade,
  artist_id uuid references artists(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(client_id, artist_id)
);

-- REVIEWS
create table reviews (
  id uuid default gen_random_uuid() primary key,
  booking_id uuid references bookings(id) on delete cascade unique,
  client_id uuid references users(id) on delete cascade,
  artist_id uuid references artists(id) on delete cascade,
  rating int check (rating between 1 and 5),
  text text,
  photo_urls text[],
  created_at timestamp with time zone default now()
);

-- =========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================

alter table users enable row level security;
alter table artists enable row level security;
alter table services enable row level security;
alter table bookings enable row level security;
alter table quotes enable row level security;
alter table saved_artists enable row level security;
alter table reviews enable row level security;

-- Users: read own row, update own row
create policy "Users can read own profile"
  on users for select using (auth.uid() = id);
create policy "Users can update own profile"
  on users for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on users for insert with check (auth.uid() = id);
create policy "Anyone can view user profiles"
  on users for select using (true);

-- Artists: anyone can read, only owner can update
create policy "Anyone can view artists"
  on artists for select using (true);
create policy "Artists can update own profile"
  on artists for update using (auth.uid() = id);
create policy "Artists can insert own profile"
  on artists for insert with check (auth.uid() = id);

-- Services: anyone can read, only artist can modify
create policy "Anyone can view services"
  on services for select using (true);
create policy "Artists can insert own services"
  on services for insert with check (
    auth.uid() = artist_id
  );
create policy "Artists can update own services"
  on services for update using (
    auth.uid() = artist_id
  );
create policy "Artists can delete own services"
  on services for delete using (
    auth.uid() = artist_id
  );

-- Bookings: clients see own, artists see theirs
create policy "Clients can view own bookings"
  on bookings for select using (auth.uid() = client_id);
create policy "Artists can view own bookings"
  on bookings for select using (auth.uid() = artist_id);
create policy "Clients can create bookings"
  on bookings for insert with check (auth.uid() = client_id);
create policy "Artists can update booking status"
  on bookings for update using (auth.uid() = artist_id);
create policy "Clients can update own bookings"
  on bookings for update using (auth.uid() = client_id);

-- Quotes: visible to both parties on the booking
create policy "Booking parties can view quotes"
  on quotes for select using (
    auth.uid() in (
      select client_id from bookings where id = booking_id
      union
      select artist_id from bookings where id = booking_id
    )
  );
create policy "Artists can create quotes"
  on quotes for insert with check (
    auth.uid() = (select artist_id from bookings where id = booking_id)
  );

-- Saved artists: clients manage their own saved list
create policy "Clients can view own saved artists"
  on saved_artists for select using (auth.uid() = client_id);
create policy "Clients can save artists"
  on saved_artists for insert with check (auth.uid() = client_id);
create policy "Clients can unsave artists"
  on saved_artists for delete using (auth.uid() = client_id);

-- Reviews: anyone can read, only client on booking can write
create policy "Anyone can read reviews"
  on reviews for select using (true);
create policy "Clients can write reviews for own bookings"
  on reviews for insert with check (auth.uid() = client_id);
