-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    technologies TEXT[],
    link TEXT,
    status TEXT DEFAULT 'Completed',
    image TEXT,
    details JSONB
);

-- 2. Create Upcoming Projects Table (Optional, or just use 'status' in projects table)
-- For now, we'll use a single table with a 'status' field to keep it simple and flexible.

-- 3. Create Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    budget TEXT,
    timeline TEXT,
    message TEXT
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies
-- Allow public read access to projects
CREATE POLICY "Allow public read access to projects" ON projects
    FOR SELECT USING (true);

-- Allow public insert access to contacts (for the contact form)
CREATE POLICY "Allow public insert access to contacts" ON contacts
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admins) all access (optional, if you use Supabase Auth)
CREATE POLICY "Allow admin full access to projects" ON projects
    FOR ALL USING (auth.role() = 'authenticated');
