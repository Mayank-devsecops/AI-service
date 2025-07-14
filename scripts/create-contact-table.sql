-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    service VARCHAR(100) NOT NULL,
    call_date DATE NOT NULL,
    call_time VARCHAR(20) NOT NULL,
    message TEXT,
    newsletter BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create an index on call_date for scheduling queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_call_date ON contact_submissions(call_date);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting new records (for the contact form)
CREATE POLICY "Allow public insert" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Create a policy for reading records (you might want to restrict this to authenticated users)
CREATE POLICY "Allow authenticated read" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create a policy for updating records (for admin users)
CREATE POLICY "Allow authenticated update" ON contact_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional, for testing)
INSERT INTO contact_submissions (name, email, company, phone, service, call_date, call_time, message, newsletter) VALUES
('John Doe', 'john@example.com', 'Tech Corp', '+1-555-0123', 'website', '2024-01-15', '10:00 AM', 'Interested in AI-powered website', true),
('Jane Smith', 'jane@startup.com', 'StartupXYZ', '+1-555-0456', 'chatbot', '2024-01-16', '02:30 PM', 'Need chatbot for customer support', false);
